const puppeteer = require("puppeteer");
const moment = require("moment");

const URL = "http://www.hal.gov.tr/Sayfalar/FiyatDetaylari.aspx";

const PATH_LIST = {
  inputPATH:
    "#ctl00_ctl36_g_7e86b8d6_3aea_47cf_b1c1_939799a091e0_dateControl_dateControlDate",
  linkPATH:
    "#ctl00_ctl36_g_7e86b8d6_3aea_47cf_b1c1_939799a091e0_gvFiyatlar > tbody > tr:last-child > td > table > tbody > tr > td > a",
};

const gotoDate = async (page, currentDate) => {
  const { inputPATH } = PATH_LIST;
  await page.waitForSelector(inputPATH);
  await page.evaluate((inputPATH) => {
    document.querySelector(inputPATH).value = "";
  }, inputPATH);
  await page.type(inputPATH, moment(currentDate).format("DD.MM.YYYY"));
  await page.keyboard.press("Enter");
};

const isNextPageAvailable = async (page, currentPage) => {
  let nextPage = currentPage + 1;
  try {
    await page.waitForSelector(PATH_LIST.linkPATH);
  } catch {
    return { available: false };
  }

  const allPageList = await page.$$eval(PATH_LIST.linkPATH, (pages) =>
    pages.map((e) => e.textContent)
  );

  let index =
    allPageList.indexOf(String(nextPage)) !== -1
      ? allPageList.indexOf(String(nextPage))
      : allPageList.indexOf("...") !== -1 && allPageList.indexOf("...") !== 0
      ? allPageList.indexOf("...")
      : -1;

  let nextPagePATH = `#ctl00_ctl36_g_7e86b8d6_3aea_47cf_b1c1_939799a091e0_gvFiyatlar > tbody > tr:last-child > td > table > tbody > tr > td:nth-child(${
    index + 2
  }) > a`;

  if (index === -1) {
    return { available: false };
  }

  return { available: true, path: nextPagePATH };
};

const scrapeAllDate = async (
  browser,
  connection,
  page,
  currentDate,
  firstDate,
  lastDate
) => {
  if (!moment(currentDate).isSameOrBefore(lastDate)) {
    return;
  }

  browser.isConnected() &&
    connection.socket.send(
      JSON.stringify({
        type: "LOG",
        data: {
          color: "text-yellow-400",
          command: "$scraping:",
          description: `currently scraping ${moment(currentDate).format(
            "DD MMM YYYY."
          )}`,
          date: moment(),
        },
      })
    );

  await page.goto(URL, { timeout: 0 });
  await gotoDate(page, currentDate);

  let currentPage = 1;

  const oneDayData = await scrapeOneDay(page, currentPage);

  browser.isConnected() &&
    connection.socket.send(
      JSON.stringify({
        type: "DATA",
        date: moment(currentDate).format("DD.MM.YYYY"),
        dateRange: `${moment(firstDate).format("DD.MM.YYYY")}-${moment(
          lastDate
        ).format("DD.MM.YYYY")}`,
        data: oneDayData,
      })
    );

  browser.isConnected() &&
    connection.socket.send(
      JSON.stringify({
        type: "LOG",
        data: {
          color: "text-yellow-400",
          command: "$saved:",
          description: `${
            oneDayData.length
          } row data successfully saved from ${moment(currentDate).format(
            "DD MMM YYYY"
          )}.`,
          date: moment(),
        },
      })
    );
  currentDate = moment(currentDate).add(1, "d");
  return scrapeAllDate(
    browser,
    connection,
    page,
    currentDate,
    firstDate,
    lastDate
  );
};

const scrapeOneDay = async (page, currentPage, oneDayData = []) => {
  const onePageData = await scrapeOnePage(page);

  const nextPage = await isNextPageAvailable(page, currentPage);

  if (nextPage.available) {
    await page.waitForSelector(nextPage.path);
    await page.$eval(nextPage.path, (e) => e.click());
    return await scrapeOneDay(page, currentPage + 1, [
      ...oneDayData,
      ...onePageData,
    ]);
  }

  return [...oneDayData, ...onePageData];
};

const scrapeOnePage = async (page) => {
  try {
    await page.waitForSelector(
      "#ctl00_ctl36_g_7e86b8d6_3aea_47cf_b1c1_939799a091e0_gvFiyatlar > tbody > tr > td"
    );
  } catch {
    return [];
  }
  return await page.evaluate(() => {
    return [
      ...Array.from(
        document.querySelectorAll(
          "#ctl00_ctl36_g_7e86b8d6_3aea_47cf_b1c1_939799a091e0_gvFiyatlar > tbody > tr"
        )
      ).map((value, index, arr) => {
        const oneRowData = {
          urunAdi: "",
          urunCinsi: "",
          urunTuru: "",
          ortalamaFiyat: "",
          islemHacmi: "",
          birimAdi: "",
        };

        if (index === 0 || index === arr.length - 1) {
          return;
        }

        Array.from(value.querySelectorAll("td")).map((element, i) => {
          oneRowData[Object.keys(oneRowData)[i]] = element.textContent.trim();
        });

        return oneRowData;
      }),
    ].filter((value) => value);
  });
};

const scrape = async (browser, connection, startDate, endDate) => {
  let currentDate = moment(startDate, "DD.MM.YYYY");
  let firstDate = moment(startDate, "DD.MM.YYYY");
  let lastDate = moment(endDate, "DD.MM.YYYY");

  browser.isConnected() &&
    connection.socket.send(
      JSON.stringify({
        type: "SCRAPE_STATUS",
        data: {
          scraping: true,
        },
      })
    );
  browser.isConnected() &&
    connection.socket.send(
      JSON.stringify({
        type: "LOG",
        data: {
          color: "text-green-400",
          command: "$started:",
          description: `tool started to scrape data from ${moment(
            startDate,
            "DD.MM.YYYY"
          ).format("DD MMM YYYY")} to ${moment(endDate, "DD.MM.YYYY").format(
            "DD MMM YYYY"
          )}.`,
          date: moment(),
        },
      })
    );

  const page = await browser.newPage();

  try {
    await scrapeAllDate(
      browser,
      connection,
      page,
      currentDate,
      firstDate,
      lastDate
    );
  } catch (error) {
    browser.isConnected() &&
      connection.socket.send(
        JSON.stringify({
          type: "LOG",
          data: {
            color: "text-red-400",
            command: "$error:",
            description: error.message,
            date: moment(),
          },
        })
      );
  }

  browser.isConnected() &&
    connection.socket.send(
      JSON.stringify({
        type: "LOG",
        data: {
          color: "text-green-400",
          command: "$finished:",
          description:
            "tool finished to scrape. you can export as a CSV or JSON bellow, happy hacking :)",
          date: moment(),
        },
      })
    );
  browser.isConnected() &&
    connection.socket.send(
      JSON.stringify({
        type: "SCRAPE_STATUS",
        data: {
          scraping: false,
        },
      })
    );
  await browser.close();
};

module.exports = scrape;

function Footer() {
  return (
    <div className="w-full mt-12 bg-[#0c0c0c] text-center">
      <span className="font-inter font-light text-xs">
        Created by{" "}
        <a
          href="https://github.com/BilalGumus"
          alt="Bilal Gümüş's Github Account"
          target="_blank"
          className="text-blue-400 hover:text-blue-500 hover:underline"
        >
          Bilal Gümüş
        </a>{" "}
        &#8226; &#169; 2022 Educational Purposes Only.
      </span>
    </div>
  );
}

export default Footer;

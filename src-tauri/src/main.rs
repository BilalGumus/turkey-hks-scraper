#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{
    api::process::{Command, CommandEvent},
    Manager,
};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            let (mut rx, mut child) = Command::new_sidecar("scraping-server")
                .expect("failed to create `my-sidecar` binary command")
                .spawn()
                .expect("Failed to spawn sidecar");

            tauri::async_runtime::spawn(async move {
                // read events such as stdout
                while let Some(event) = rx.recv().await {
                    if let CommandEvent::Stdout(line) = event {
                        window
                            .emit("message", Some(format!("'{}'", line)))
                            .expect("failed to emit event");
                        // write to stdin
                        child.write("message from Rust\n".as_bytes()).unwrap();
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

// #![cfg_attr(
//     all(not(debug_assertions), target_os = "windows"),
//     windows_subsystem = "windows"
// )]

// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }

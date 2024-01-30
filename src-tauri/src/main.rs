// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{CustomMenuItem, SystemTray, SystemTrayEvent, SystemTrayMenu};

#[tauri::command]
async fn set_atomic_mode() {
    let client = reqwest::Client::builder()
        .proxy(reqwest::Proxy::http("http://localhost:8888").unwrap())
        .build()
        .unwrap();
    let page: &str = "https://ya.ru/atomic";
    let res = client.get(page).send().await.unwrap();
    println!("Status: {}", res.status());
}

fn main() {
    let menu = SystemTrayMenu::new()
        .add_item(CustomMenuItem::new("quit", "Quit"))
        .add_item(CustomMenuItem::new("about", "About"));
    let tray = SystemTray::new().with_menu(menu);

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| {
            if let SystemTrayEvent::MenuItemClick { id, .. } = event {
                match id.as_str() {
                    "quit" => app.exit(0),
                    "about" => {
                        println!("about");
                    }
                    _ => {}
                }
            }
        })
        .invoke_handler(tauri::generate_handler![set_atomic_mode])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

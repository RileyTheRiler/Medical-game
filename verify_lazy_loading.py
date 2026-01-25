from playwright.sync_api import Page, expect, sync_playwright
import re

def verify_app_navigation(page: Page):
    # 1. Go to the app
    print("Navigating to app...")
    page.goto("http://localhost:5173")

    # 2. Check Title Screen
    print("Checking Title Screen...")
    expect(page.get_by_text("CodeRx Academy")).to_be_visible()

    # 3. Click Start Button
    # The button text depends on stats. It could be "Begin Training" or "Resume Training".
    print("Clicking Start Button...")
    start_button = page.get_by_role("button", name=re.compile("Training"))
    start_button.click()

    # 4. Wait for Menu Screen
    # We look for the "Learning Chapters" tab which is part of the MenuScreen
    print("Waiting for Menu Screen...")
    chapters_tab = page.get_by_role("tab", name="Learning Chapters")
    expect(chapters_tab).to_be_visible()

    # 5. Take Screenshot
    print("Taking screenshot...")
    page.screenshot(path="/home/jules/verification/menu_loaded.png")
    print("Screenshot saved to /home/jules/verification/menu_loaded.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_app_navigation(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
            raise e
        finally:
            browser.close()

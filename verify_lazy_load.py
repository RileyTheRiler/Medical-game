from playwright.sync_api import Page, expect, sync_playwright

def test_lazy_load(page: Page):
    # 1. Load the app (Title Screen)
    print("Loading Title Screen...")
    page.goto("http://localhost:5173/")

    # Verify Title Screen is visible
    expect(page.get_by_text("CodeRx Academy")).to_be_visible()

    # Take a screenshot of Title Screen
    page.screenshot(path="/home/jules/verification/title_screen.png")
    print("Title Screen verified.")

    # 2. Click Start to trigger lazy load of MenuScreen
    print("Clicking Start...")
    # The button text might depend on saved state. "Begin Training" or "Resume Training".
    start_button = page.get_by_role("button", name=r"Training")
    start_button.click()

    # 3. Verify Menu Screen loads
    print("Waiting for Menu Screen...")
    # "Learning Chapters" is a tab label on the Menu Screen
    expect(page.get_by_text("Learning Chapters")).to_be_visible()

    # Take a screenshot of Menu Screen
    page.screenshot(path="/home/jules/verification/menu_screen.png")
    print("Menu Screen verified.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_lazy_load(page)
        except Exception as e:
            print(f"Test failed: {e}")
            page.screenshot(path="/home/jules/verification/error.png")
        finally:
            browser.close()

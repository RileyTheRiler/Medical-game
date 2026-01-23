from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:5173")

            # Title Screen - wait for button
            start_btn = page.get_by_role("button", name="Training")
            start_btn.click()

            # Menu - Click 'Study Tools' tab
            tools_tab = page.get_by_role("tab", name="Study Tools")
            tools_tab.click()

            # Click Word Builder
            # It's in a grid, find by text "Word Builder"
            page.get_by_role("button", name="Word Builder").click()

            # Select 'Fill in Blanks' mode
            page.get_by_role("button", name="Fill in Blanks").click()

            # Assert input attributes
            input_locator = page.locator("input[type='text']")
            expect(input_locator).to_be_visible()

            # Verify maxLength
            expect(input_locator).to_have_attribute("maxlength", "50")

            # Verify aria-label
            aria_label = input_locator.get_attribute("aria-label")
            print(f"Found aria-label: {aria_label}")
            if not aria_label or "Enter the missing" not in aria_label:
                raise Exception(f"Invalid aria-label: {aria_label}")

            page.screenshot(path="verification.png")
            print("Verification successful!")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="error.png")
            raise e
        finally:
            browser.close()

if __name__ == "__main__":
    run()

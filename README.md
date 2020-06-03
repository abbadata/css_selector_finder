# ABBAdata CSS Selector Finder

Easily find unique CSS selectors using point/click interface on any web page element.

[Project home page](https://abbadata.com/selector_finder.html)

## Installation

Install the Chrome Extension.
[CSS Selector Finder in the Chrome Web Store](https://chrome.google.com/webstore/detail/abbadata-css-selector-fin/mjbofijjejpdldklldknobfegdjmmlbc)

## Demo

[Watch the video](https://www.youtube.com/watch?v=Qrc0OkOGV1I)

## Running

- Navigate to the target web page and click the Selector Finder icon on the toolbar. On the popup, choose one of the startup options.
  **"Normal Startup"** will generally preserve page functionality so that after we're done generating selectors and click **"Exit"**, page execution can resume.
  **"Remove Event Handlers and Start"** will disable all event handlers on the page before starting the CSS Selector Finder. This is useful in some cases where the event handlers on the page interfere with the normal operation of the CSS Selector Finder. However, it's likely that the page may not behave normally again until it is reloaded.
- Click on page elements and see the unique CSS Selector on the right panel or the **"Custom Selectors"** tab on the bottom panel. Since the Selector Finder tool panels may obscure relevant page content, click the arrows on the upper right of the panel to move the panel to the opposite side of the page.
- Customize Selector Finding by enabling/disabling usage of IDs, class names, and/or tag names. Specific values of those fields can also be filtered out. Custom attribute names and/or values can also be used for selector finding.
- **"Seed Min Length"**, **"Optimized Min Length"**, **"Threshhold"**, and **"Max Number of Tries"** are tunable settings that control the selector finding algorithm. These are used by [Anton Medvedev's CSS Selector Generator](https://github.com/antonmedv/finder), which is the underlying library that CSS Selector Finder uses. Please visit that project for details on how these settings can be tuned. Current values are set to the default, and should yield reasonable selectors reasonably quickly. Depending on the complexity of the target page, selector finding may take longer.
- The root element used for selector finding can be modified to something other than the document body (:root). Click the **"Use As Selector Root"** button to make the currently selected element the "selector root". When the root element is changed, only subelements of the new root will be selectable. Selectors will then be found relative to the root element. Thus if we were writing Javascript:

```
var rootElement = document.getSelector(root_selector);
var subElement = rootElement.getSelector(selector_with_custom_root);
```

should return the correct element for the subelement. This is useful for pages containing multiple individual records, so that details can be parsed out relative to the containing element.

- Use the **"Test Selector"** tab to test a user specified CSS selector. The matched elements will be highlighted, and the number of matching elements will be displayed.
- Click the **"Exit"** button on the right tool panel to stop CSS Selector Finder.

## Limitations

- Does not work with IFRAMEs. IFRAMEs will still be highlighted when mouse hovers over it,
  but it can not be clicked on.
- May not work properly with some websites where event handling/CSS
  styles conflict with the tool's behavior.

## Development

### Building

1. Clone this project.
2. npm install
3. npm run build-dev
4. The built files will be created in the <project>/dist directory

### Loading

1. Navigate to chrome://extensions
2. Click the "Developer mode" switch if not already enabled
3. Click "Load unpacked". Select the <project>/dist directory as the extension directory.

### Testing

- npm run test

## Credits

I did not attempt to write a new selector finding library from scratch. There are some good
ones out there. I chose to use Anton Medvedev's CSS Generator tool
[GitHub](https://github.com/antonmedv/finder). It's quick and customizable. Much thanks for
creating such a nice library!

## Changelog

v0.1
Initial release

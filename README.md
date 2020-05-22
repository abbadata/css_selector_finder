# ABBAdata CSS Selector Finder

Easily find unique CSS selectors using point/click interface on any web page element.

## Installation

Install the Chrome Extension.

## Running

- Navigate to the target web page and click the Selector Finder icon on the toolbar.
  Page navigation will temporarily be disabled (only onClick handlers will be disabled,
  although other ways to navigate off the page may still work)
- Click on page elements and see the unique CSS Selector on the right panel or the
  "Custom Selectors" tab on the bottom panel. Since the Selector Finder tool panels
  may obscure relevant page content, click the arrows on the upper right of the
  panel to move the panel to the opposite side of the page.
- Customize Selection Finding by enabling/disabling usage of IDs, class names, and/or
  tag names. Specific values of those fields can also be filtered out. Custom
  attribute names and/or values can also be used for selector finding.
- "Seed Min Length", "Optimized Min Length", "Threshhold", and "Max Number of Tries"
  are tunable settings that control the selector finding algorithm. These are used by
  https://github.com/antonmedv/finder . Please visit that project for details. Current
  values are set to the default, and should yield reasonable selectors reasonably quickly.
  Depending on the complexity of the target page, selector finding may take longer.
- The root element used for selector finding can be modified to something other than
  the document body (:root). Click the "Use As Selector Root" button to make the
  currently selected element the "selector root". When the root element is changed,
  only child elements of the new root will be selectable. Selectors will then be found
  relative to the root element. Thus:
  `[rootElement].getSelector([foundSelector])`
  should return the correct element. This is useful for pages containing multiple individual
  records, so that details can be parsed out relative to the containing element.
- Use the "Test Selector" tab to test a user specified CSS selector. The matched
  elements will be highlighted, and the number of matching elements will be displayed.

## Limitations

- Does not work with IFRAMEs. IFRAMEs will still be highlighted when mouse hovers over it,
  but it can not be clicked on.
- May not work properly with some websites where event handing behavior may conflict with
  the tool's behavior.

## Development

### Building

1. Clone this project.
2. npm install
3. npm run build-dev
4. The built files will be created in the <project>/dist directory

### Loading

1. Enable developer extensions in chrome
2. Navigate to chrome://extensions
3. Click the "Developer mode" switch if not already enabled
4. Click "Load unpacked". Select the <project>/dist directory as the extension directory.

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

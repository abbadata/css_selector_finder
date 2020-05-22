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
  tag names. Specific values of those fields can also be filtered out.
- "Seed Min Length", "Optimized Min Length", and "Threshhold" are settings used by
  https://github.com/antonmedv/finder . Please visit that project for details. Current
  values are set so that selector finding will be fairly quick, even on complicated sites.
  Specifically, "Seed Min Length" is kept low so selector finding can quickly be
  shortcircuited once a unique selector is found, regardless of length. "Optimized Min Length"
  is made high to reduce the effort to make the selector as short as possible.
  - "Seed Min Length" - higher number makes the selector more resistant to changes in the
    page that would tend to duplicate the area around the selected element. Essentially this
    makes the selector more specific to the selected element.
  - "Optimized Min Length" - if shorter selectors are preferable, lowering this value
    will attempt to shorten the selector while still maintaining uniqueness.
  - "threshold" - helps short-circuit selector finding if
- The root element used for selector finding can be modified to something other than
  the document body (:root). Click the "Use As Selector Root" button to make the
  currently selected element the "selector root". When the root element is changed,
  only child elements of the new root will be selectable. Selectors will then be found
  relative to the root element. Thus:
  [rootElement].getSelector([foundSelector])
  should return the correct element. This is useful for pages which multiple individual
  records, in which case it's easier to get individual fields relative to the element
  containing a single record.
- Use the "Test Selector" tab to test a user specified CSS selector. The matched
  elements will be highlighted, and the number of matching elements will be displayed.

## Settings for Finding Selectors

The CSS Selector Finder uses the great Finder by Anton Medvedev ().
It allows varying levels of settings to generate optimal selectors.

## Limitations

- Does not work with IFRAMEs. IFRAMEs will still be highlighted when mouse hovers over it,
  but it can not be clicked on.

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

I did not attempt to write a new selector finding library from scratch since there
are already several good ones out there. I chose to use https://github.com/antonmedv/finder
since it works nicely and has the right level of customizability for my needs. Thanks for
creating a very nice library!

## License

MIT

## Changelog

v0.1
Initial release

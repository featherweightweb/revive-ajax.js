# revive-ajax.js
Simple jQuery Plugin to Deliver Revive Ads via AJAX

## Installation
You can download this script from npm:
```bash
npm install revive-ajax.js
```

Or, from bower:
```bash
bower install revive-ajax.js
```

Or, clone this repository and copy the files into your project:
```bash
git clone https://github.com/featherweightweb/revive-ajax.js.git
```

Once downloaded, you can include either the `revive-ajax.js` or `revive-ajax.min.js` scripts in your page after you include jQuery:
```html
<head>
 <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
 <script src="path/to/revive-ajax.js"></script>
</head>
<body>
 <!-- awesome stuff here... -->
</body>
```

## Usage
To loads ads into your page, you must place elements with a `data-zoneid` attribute where you want your ads to display. For example:
```html
<div data-zoneid="4"></div>
```

You may use whatever element you want. You can put content into the element that will show in place of the ad until it has been loaded:
```html
<div data-zoneid="4">
  <p>Please wait while we load some awesome ads! <img src="loading.gif"></p>
</div>
```

The last step is to include in your page a `script` element that will run the plugin:
```html
<script>
  $(function() {
    $('[data-zoneid]').reviveAjax({
      reviveUrl: 'http://revive.mydomain.com/delivery/ajs.php'
    });
  );
</script>
```

The `reviveUrl` option tells the plugin where to pull your ads from and must be a path to the `ajs.php` delivery script.

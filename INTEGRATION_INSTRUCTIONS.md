# Whiskey Wiz Integration Instructions

## Admin Panel Integration
Add this code to your Shopify page where you want the admin panel:
```html
<div id="whiskey-wiz-admin"></div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    window.renderWhiskeyWizAdmin('whiskey-wiz-admin');
  });
</script>
```

## Quarter Game Integration
Add these tags where you want to embed specific quarter games:

### 2022 Quarters
```html
<div id="whiskey-wiz-q1-2022"></div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    window.renderWhiskeyWizGame('whiskey-wiz-q1-2022', '0122');
  });
</script>
```

### 2023 Quarters
```html
<div id="whiskey-wiz-q1-2023"></div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    window.renderWhiskeyWizGame('whiskey-wiz-q1-2023', '0123');
  });
</script>
```

### 2024 Quarters
```html
<div id="whiskey-wiz-q1-2024"></div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    window.renderWhiskeyWizGame('whiskey-wiz-q1-2024', '0124');
  });
</script>
```

### 2025 Quarters
```html
<div id="whiskey-wiz-q1-2025"></div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    window.renderWhiskeyWizGame('whiskey-wiz-q1-2025', '0125');
  });
</script>
```

## Required Scripts
Add this script to your Shopify theme.liquid file:
```html
<!-- Whiskey Wiz Dependencies -->
<script src="{{ 'whiskey-wiz-bundle.js' | asset_url }}" type="text/javascript" async></script>
```

## Important Notes
* Upload whiskey-wiz-bundle.js to Shopify's Files section (Settings > Files)
* The admin panel should only be embedded on admin-specific pages
* Each quarter component can be embedded independently
* Components will automatically handle authentication
* Changes made in admin panel affect all embedded instances
* Make sure to configure Firebase authentication settings
* Use CSS to style the container div as needed

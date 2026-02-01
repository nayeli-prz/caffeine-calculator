# Caffeine Calculator

A personalized caffeine tracking tool designed to help monitor daily caffeine intake during pregnancy. This calculator provides accurate estimates based on brewing method, bean quantity, and consumption amount.

## About

This tool was created to help maintain safe caffeine levels (under 100-140mg per day) by calculating precise caffeine content from different brewing methods. It accounts for:

- Different extraction rates by brewing method
- Actual amount consumed vs. total brewed
- Multiple brew types including coffee and tea

## Features

- **Multiple brew methods**: Pour over, Moka pot, Drip coffee, Espresso, French press
- **Tea options**: Chai, Earl Grey, and Green tea
- **Precise inputs**: Track grams of beans, water volume, and actual consumption
- **Unit flexibility**: Switch between ml and oz
- **Color-coded results**: Visual feedback based on caffeine levels
  - Under 100mg (safe - teal)
  - 100-140mg (moderate - gold)
  - 140-200mg (warning - orange)
  - Over 200mg (high - red)
- **Transparent calculations**: View exactly how your caffeine is calculated

## How It Works

### Coffee Methods
The calculator uses the formula:
```
Caffeine = (grams of beans × 11mg/g) × extraction rate × (amount drunk ÷ total brewed)
```

**Extraction rates by method:**
- Pour over: 70%
- Moka pot: 75%
- Drip coffee: 65%
- French press: 75%

### Espresso
- Single shot: ~70mg
- Double shot: ~140mg

### Tea
Caffeine per 8oz:
- Chai tea: ~50mg
- Earl Grey: ~40mg
- Green tea: ~28mg

## Usage

1. **Select your brewing method** from the grid
2. **Enter your measurements**:
   - For coffee: grams of beans, total water used, amount you'll drink
   - For espresso: choose single or double shot
   - For tea: amount of tea you'll drink
3. **Click "Calculate Caffeine Amount"** to see results
4. **View calculation details** to understand how the amount was calculated

## Technical Details

- **Built with**: Pure HTML, CSS, and JavaScript (no dependencies)
- **Fonts**: Archive (main text), Caveat (accent)
- **Responsive**: Works on desktop and mobile
- **Browser support**: All modern browsers

## Installation

1. Clone or download this repository
2. Ensure all image files are in the same directory as `caffeine-calculator.html`
3. Open `caffeine-calculator.html` in your web browser

No build process or server required!

## Files

```
caffeine-calculator/
├── caffeine-calculator.html       # Main application file
├── Accent_Image.png               # Sidebar accent image
├── method-picture-pourover.png
├── method-picture-mokapot.png
├── method-picture-espresso.png
├── method-picture-drip.png
├── method-picture-french_press.png
├── method-picture-Earl_Gray.png
├── method-picture-Green_Tea.png
├── method-picture-Chai_Tea.png
└── ResultSection-Drawing.png      # Coffee cup icon
```

## Caffeine Guidelines

This calculator is designed around pregnancy caffeine guidelines:
- **Target**: Under 100mg per day
- **Maximum**: Up to 140mg considered safe by most guidelines
- **Warning zone**: 140-200mg
- **Over limit**: 200mg+

*Always consult with your healthcare provider about appropriate caffeine limits for your situation.*

## Future Enhancements

Potential features for future versions:
- Daily tracking history
- Multiple drinks per day
- Export to CSV
- Bean type selection (Arabica vs. Robusta)
- Brew time/temperature adjustments

## Contributing

This is a personal project, but suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.

## License

MIT License - feel free to use and modify for your own needs.

## Acknowledgments

Built with care for precise caffeine tracking during pregnancy. Design and development by Nayeli.

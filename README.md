# Tunic Language Symbols

This is a simple Obsidian plugin that displays Tunic language symbols.
## Installation

> **It's recommended to create a new vault before using this plugin.**

Clone this repository in the `plugins` folder of your obsidian vault.
*You may have to create the folder at `VAULT/.obsidian/plugins`*

In Obsidian settings, Under `community plugins`, click on `Turn on community plugins` if you haven't done so already.

Enable `Tunic language symbols` 

## How to Use

The plugin replaces the pattern `t%hexchars%` with the corresponding Tunic symbols in the **read view**.
Each bit in the `hexchars` string represents a possible line in the symbol.

### Single-Width Symbols

A single-width symbol requires **4 hexadecimal characters** to fully define its structure:

- **First two characters** represent the **top half** of the symbol.
- **Last two characters** represent the **bottom half** of the symbol.

#### Breakdown

1. **First character**: Defines the **vertical lines** of the top section.
   - Bit 1 → Leftmost line
   - Bit 2 → Top part of the middle line
   - Bit 3 → Bottom part of the middle line
   - Bit 4 → Rightmost line
2. **Second character**: Represents the **top diamond**.
   - Each bit defines one side of the diamond, starting from the **top left**, moving **clockwise**.
3. **Third character**: Defines the **bottom lines** and **circle**.
   - Uses the same pattern as the top lines.
   - Bit 3 represents the **circle**.
4. **Fourth character**: Represents the **bottom diamond**.
   - Follows the same pattern as the **top diamond**.

### Multi-Width Symbols

> **This format may change in the future.**

Multi-width symbols require **4 hex characters per width unit**.
Since widths overlap, a single symbol can have multiple representations.

For example, both `t%10100000%` and `t%10108080%` produce the same symbol.

## Examples

### Fully lined symbol

Single width symbol with all possible lines displayed

```md
t%ffff%
```

2 width symbol with all possible lines displayed

```md
t%ffffffff%
```

3 width symbol with all possible lines displayed

```md
t%ffffffffffff%
```

### In game examples

The following are symbols found in game, I'll keep spoiler to the first 10 minutes of the game

This symbol is found while pressing `A` on the mail-box

```md
t%80af2240abc3% ...
```

The following text is seen when obtaining the stick

```md
t%224a010c400c% t%8dac% t%3770008f% !
```

## TODO

- [ ] Allow the use of symbols in filenames for internal links.
- [ ] Fix potential "fence" ambiguity for multi-width symbols.
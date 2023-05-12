import { min, max } from 'lodash';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  private MIN_QUALITY = 0;
  private MAX_QUALITY = 50;
  private STANDARD_ITEM_QUALITY_DECREMENT = 1;

  constructor(items: Item[] = []) {
    this.items = items;
  }

  private determineIsOnOrPastSellByDate(item: Item): boolean {
    return item.sellIn <= 0;
  }

  private decrementSellInValue(item: Item): number {
    return item.sellIn - 1;
  }

  private updateAgedBrieItem(item: Item): Item {
    const { quality } = item;

    const AGED_BRIE_ITEM_QUALITY_INCREMENT = 1;

    const isOnOrPastSellByDate = this.determineIsOnOrPastSellByDate(item);
    const qualityIncrement = isOnOrPastSellByDate
      ? 2 * AGED_BRIE_ITEM_QUALITY_INCREMENT
      : AGED_BRIE_ITEM_QUALITY_INCREMENT;

    const updatedItem: Item = {
      ...item,
      sellIn: this.decrementSellInValue(item),
      quality: min([quality + qualityIncrement, this.MAX_QUALITY])!,
    };

    return updatedItem;
  }

  private updateSulfurasItem(item: Item): Item {
    // Sulfuras is a legendary item and never has to be sold or decreases in quality
    return item;
  }

  private updateBackstagePassesItem(item: Item): Item {
    const { sellIn, quality } = item;

    const isOnOrPastSellByDate = this.determineIsOnOrPastSellByDate(item);

    if (isOnOrPastSellByDate) {
      // Quality drops to 0 on or after the concert
      return { ...item, sellIn: this.decrementSellInValue(item), quality: 0 };
    }

    const qualityIncrement = sellIn <= 5 ? 3 : sellIn <= 10 ? 2 : 1;

    const updatedItem: Item = {
      ...item,
      sellIn: this.decrementSellInValue(item),
      quality: min([quality + qualityIncrement, this.MAX_QUALITY])!,
    };

    return updatedItem;
  }

  private updateConjuredItem(item: Item): Item {
    const { quality } = item;

    const CONJURED_ITEM_QUALITY_DECREMENT =
      2 * this.STANDARD_ITEM_QUALITY_DECREMENT;

    const isOnOrPastSellByDate = this.determineIsOnOrPastSellByDate(item);
    const qualityDecrement = isOnOrPastSellByDate
      ? 2 * CONJURED_ITEM_QUALITY_DECREMENT
      : CONJURED_ITEM_QUALITY_DECREMENT;

    const updatedItem: Item = {
      ...item,
      sellIn: this.decrementSellInValue(item),
      quality: max([quality - qualityDecrement, this.MIN_QUALITY])!,
    };

    return updatedItem;
  }

  private updateStandardItem(item: Item): Item {
    const { quality } = item;

    const isOnOrPastSellByDate = this.determineIsOnOrPastSellByDate(item);
    const qualityDecrement = isOnOrPastSellByDate
      ? 2 * this.STANDARD_ITEM_QUALITY_DECREMENT
      : this.STANDARD_ITEM_QUALITY_DECREMENT;

    const updatedItem: Item = {
      ...item,
      sellIn: this.decrementSellInValue(item),
      quality: max([quality - qualityDecrement, this.MIN_QUALITY])!,
    };

    return updatedItem;
  }

  public updateQuality(): Item[] {
    this.items = this.items.map((item) => {
      const { name } = item;

      switch (name) {
        case 'Aged Brie':
          return this.updateAgedBrieItem(item);
        case 'Sulfuras, Hand of Ragnaros':
          return this.updateSulfurasItem(item);
        case 'Backstage passes to a TAFKAL80ETC concert':
          return this.updateBackstagePassesItem(item);
        case 'Conjured Mana Cake':
          return this.updateConjuredItem(item);
        default:
          return this.updateStandardItem(item);
      }
    });

    return this.items;
  }
}

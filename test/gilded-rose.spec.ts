import { Item, GildedRose } from '@/gilded-rose';

describe('Standard items', () => {
  test('Quality of item is degraded by 1 before the sell by date', () => {
    const items = [new Item('+5 Dexterity Vest', 1, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(3);
  });

  test('Quality of item is degraded by 2 on the sell by date', () => {
    const items = [new Item('+5 Dexterity Vest', 0, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(2);
  });

  test('Quality of item is degraded by 2 after the sell by date', () => {
    const items = [new Item('+5 Dexterity Vest', -1, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(2);
  });

  test('Quality of item is minimum 0', () => {
    const items = [new Item('+5 Dexterity Vest', 10, 0)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });

  test('The sellIn value is decremented by 1 regardless of current sellIn value or quality', () => {
    const items = [
      new Item('+5 Dexterity Vest', 0, 4),
      new Item('+5 Dexterity Vest', 10, 0),
      new Item('+5 Dexterity Vest', -1, 0),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[1].sellIn).toBe(9);
    expect(updatedItems[2].sellIn).toBe(-2);
  });
});

describe('Sulfurus items', () => {
  test('The quality value is never updated', () => {
    const items = [
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Sulfuras, Hand of Ragnaros', 1, 80),
      new Item('Sulfuras, Hand of Ragnaros', -1, 80),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].quality).toBe(80);
    expect(updatedItems[1].quality).toBe(80);
    expect(updatedItems[2].quality).toBe(80);
  });

  test('The sellIn value is never updated', () => {
    const items = [
      new Item('Sulfuras, Hand of Ragnaros', 0, 4),
      new Item('Sulfuras, Hand of Ragnaros', 10, 0),
      new Item('Sulfuras, Hand of Ragnaros', -1, 0),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(0);
    expect(updatedItems[1].sellIn).toBe(10);
    expect(updatedItems[2].sellIn).toBe(-1);
  });
});

describe('Aged Brie items', () => {
  test('Quality of item is upgraded by 1 before the sell by date', () => {
    const items = [new Item('Aged Brie', 1, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(5);
  });

  test('Quality of item is upgraded by 2 on the sell by date', () => {
    const items = [new Item('Aged Brie', 0, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(6);
  });

  test('Quality of item is upgraded by 2 after the sell by date', () => {
    const items = [new Item('Aged Brie', -1, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(6);
  });

  test('Quality of item is maximum 50', () => {
    const items = [new Item('Aged Brie', 10, 50)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(50);
  });

  test('The sellIn value is decremented by 1 regardless of current sellIn value or quality', () => {
    const items = [
      new Item('Aged Brie', 0, 4),
      new Item('Aged Brie', 10, 0),
      new Item('Aged Brie', -1, 0),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[1].sellIn).toBe(9);
    expect(updatedItems[2].sellIn).toBe(-2);
  });
});

describe('Backstage pass items', () => {
  test('Quality of item is upgraded by 1, more than 10 days before the sell by date', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 11, 4),
    ];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(5);
  });

  test('Quality of item is upgraded by 2, less or equal than 10 days before the sell by date', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 4),
    ];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(6);
  });

  test('Quality of item is upgraded by 3, less or equal than 5 days before the sell by date', () => {
    const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(7);
  });

  test('Quality of item is reduced to 0 on the sell by date', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20),
    ];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });

  test('Quality of item is reduced to 0 after the sell by date', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 20),
    ];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });

  test('Quality of item is maximum 50', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 50),
    ];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(50);
  });

  test('The sellIn value is decremented by 1 regardless of current sellIn value or quality', () => {
    const items = [
      new Item('Backstage passes to a TAFKAL80ETC concert', 0, 4),
      new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0),
      new Item('Backstage passes to a TAFKAL80ETC concert', -1, 0),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[1].sellIn).toBe(9);
    expect(updatedItems[2].sellIn).toBe(-2);
  });
});

describe('Conjured items', () => {
  test('Quality of item is degraded by 2 before the sell by date', () => {
    const items = [new Item('Conjured Mana Cake', 1, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(2);
  });

  test('Quality of item is degraded by 4 on the sell by date', () => {
    const items = [new Item('Conjured Mana Cake', 0, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });

  test('Quality of item is degraded by 4 after the sell by date', () => {
    const items = [new Item('Conjured Mana Cake', -1, 4)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });

  test('Quality of item is minimum 0', () => {
    const items = [new Item('Conjured Mana Cake', 10, 1)];
    const gildedRose = new GildedRose(items);
    const [item] = gildedRose.updateQuality();
    expect(item.quality).toBe(0);
  });

  test('The sellIn value is decremented by 1 regardless of current sellIn value or quality', () => {
    const items = [
      new Item('Conjured Mana Cake', 0, 4),
      new Item('Conjured Mana Cake', 10, 0),
      new Item('Conjured Mana Cake', -1, 0),
    ];
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0].sellIn).toBe(-1);
    expect(updatedItems[1].sellIn).toBe(9);
    expect(updatedItems[2].sellIn).toBe(-2);
  });
});

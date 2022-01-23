---
sidebar_position: 1
---

# Sambung Ayat

## Description

Pemain diminta menebak ayat selanjutnya dari ayat yang ditampilkan.

Method: `GET`

```http
https://dev.merawathafalan.my.id/api/v1/sambung-ayat
```

## Paramater

| Name     | Type      | Description                                       | Status   | Default Value |
| :------- | :-------- | :------------------------------------------------ | -------- | ------------- |
| `amount` | `integer` | Jumlah pertanyaan                                 | Optional | 1             |
| `mode`   | `string`  | Mode dari soal pertanyaan, antara surah atau juz  | Optional | surah         |
| `select` | `integer` | Nomor dari surah atau juz, dipisahkan dengan koma | Optional | 1             |

:::info

Jika mode yang dipilih adalah `juz`, maka `select` maksimal adalah 30.

Jika mode yang dipilih adalah `surah`, maka `select` maksimal adalah 114.

:::

## Example

```http
https://dev.merawathafalan.my.id/api/v1/sambung-ayat?amount=3&mode=surah&select=112,113,114
```

### Response

Soal ada pada bagian `results` berbentuk array. Jawaban yang benar dari setiap pilihan adalah yang memiliki value `1`.

```json
{
  "error": null,
  "amount": 3,
  "mode": "surah",
  "select": [112, 113, 114],
  "results": [
    {
      "id": 0,
      "questionText": "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      "questionVerseId": 6231,
      "options": [
        {
          "value": 0,
          "option": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"
        },
        {
          "value": 0,
          "option": "اللَّهُ الصَّمَدُ"
        },
        {
          "value": 0,
          "option": "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ"
        },
        {
          "value": 1,
          "option": "مَلِكِ النَّاسِ"
        }
      ]
    },
    {
      "id": 1,
      "questionText": "مَلِكِ النَّاسِ",
      "questionVerseId": 6232,
      "options": [
        {
          "value": 0,
          "option": "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ"
        },
        {
          "value": 0,
          "option": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ"
        },
        {
          "value": 1,
          "option": "إِلَٰهِ النَّاسِ"
        },
        {
          "value": 0,
          "option": "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ"
        }
      ]
    },
    {
      "id": 2,
      "questionText": "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      "questionVerseId": 6228,
      "options": [
        {
          "value": 1,
          "option": "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ"
        },
        {
          "value": 0,
          "option": "مِنْ شَرِّ مَا خَلَقَ"
        },
        {
          "value": 0,
          "option": "مِنَ الْجِنَّةِ وَالنَّاسِ"
        },
        {
          "value": 0,
          "option": "مَلِكِ النَّاسِ"
        }
      ]
    }
  ]
}
```

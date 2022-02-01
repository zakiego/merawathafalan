---
sidebar_position: 1
---

# Tebak Ayat Setelahnya

## Description

Pemain diminta menebak ayat setelahnya dari ayat yang ditampilkan.

Method: `GET`

```http
https://dev.merawathafalan.my.id/api/v1/verse-after
```

## Paramater

| Name     | Type      | Description                                                                                | Status   | Default Value |
| :------- | :-------- | :----------------------------------------------------------------------------------------- | -------- | ------------- |
| `amount` | `integer` | Jumlah pertanyaan. Jumlah pertanyaan maksimal yang bisa dibuat adalah 50                   | Optional | 1             |
| `mode`   | `string`  | Tipe sumber soal pertanyaan, antara surah atau juz, kemudian akan dipilih melalui `select` | Optional | surah         |
| `select` | `integer` | Nomor dari surah atau juz, dipisahkan dengan koma                                          | Optional | 1             |

\*Optional artinya tidak wajib ada, bisa untuk ditinggalkan. Karena valuenya akan secara otomatis menggunakan default value.

## Example

Misalkan, ingin membuat 3 pertanyaan dengan surah:

- Al-Ikhlas (surah ke-112)
- Al-Falaq (surah ke-113)
- dan An-Nas (surah ke-114)

Maka `mode` yang dipilih adalah _surah_ sedangkan `select` berisi nomor dari surah yang dipilih.

```http
https://dev.merawathafalan.my.id/api/v1/verse-after?amount=3&mode=surah&select=112,113,114
```

Sedangkan, jika ingin memilih berdasarkan bagian juz, maka `mode` yang dipilih adalah _juz_. Misalkan ingin memilih juz 1 dan 30, berarti `select=1,30`.

```http
https://dev.merawathafalan.my.id/api/v1/verse-after?amount=3&mode=juz&select=1,30
```

:::danger

Jika mode yang dipilih adalah `juz`, maka `select` maksimal adalah 30.

Jika mode yang dipilih adalah `surah`, maka `select` maksimal adalah 114.
:::

### Response

Soal terletak pada bagian `results` berbentuk array. Untuk setiap soal memiliki 4 pilihan, dan jawaban yang benar adalah yang memiliki value `1`. Jika ada error, maka properti `error` akan berisi pesan error.

```json
{
  "error": null,
  "amount": 3,
  "mode": "surah",
  "select": [112, 113, 114],
  "results": [
    {
      "id": 0,
      "questionText": "مِن شَرِّ مَا خَلَقَ",
      "questionVerseId": 6227,
      "options": [
        {
          "value": 0,
          "option": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"
        },
        {
          "value": 0,
          "option": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ"
        },
        {
          "value": 0,
          "option": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ"
        },
        {
          "value": 1,
          "option": "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ"
        }
      ]
    },
    {
      "id": 1,
      "questionText": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      "questionVerseId": 6229,
      "options": [
        {
          "value": 1,
          "option": "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ"
        },
        {
          "value": 0,
          "option": "لَمْ يَلِدْ وَلَمْ يُولَدْ"
        },
        {
          "value": 0,
          "option": "مِن شَرِّ مَا خَلَقَ"
        },
        {
          "value": 0,
          "option": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"
        }
      ]
    },
    {
      "id": 2,
      "questionText": "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
      "questionVerseId": 6225,
      "options": [
        {
          "value": 1,
          "option": "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ"
        },
        {
          "value": 0,
          "option": "مِنَ الْجِنَّةِ وَالنَّاسِ"
        },
        {
          "value": 0,
          "option": "مَلِكِ النَّاسِ"
        },
        {
          "value": 0,
          "option": "قُلْ هُوَ اللَّهُ أَحَدٌ"
        }
      ]
    }
  ]
}
```

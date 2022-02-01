---
sidebar_position: 3
---

# Tebak Surah

## Description

Pemain diminta menebak nama surah dari ayat yang ditampilkan.

Method: `GET`

```http
https://dev.merawathafalan.my.id/api/v1/guess-surah?select=1,112,113,114
```

## Paramater

| Name     | Type      | Description                                                              | Status   | Default Value |
| :------- | :-------- | :----------------------------------------------------------------------- | -------- | ------------- |
| `amount` | `integer` | Jumlah pertanyaan. Jumlah pertanyaan maksimal yang bisa dibuat adalah 50 | Optional | 1             |
| `select` | `integer` | Nomor dari surah, dipisahkan dengan koma, minimal memilih 4 surah        | Requried | -             |

\*Optional artinya tidak wajib ada, bisa untuk ditinggalkan. Karena valuenya akan secara otomatis menggunakan default value.

## Example

Misalkan, ingin membuat 3 pertanyaan dengan surah:

- Al-Fatihah (surah ke-1)
- Al-Ikhlas (surah ke-112)
- Al-Falaq (surah ke-113)
- dan An-Nas (surah ke-114)

:::danger
Surah yang dipilih minimal 4 surah

Select maksimal adalah 114, karena surah terakhir adalah surah An-Nas (surah ke-114)
:::

```http
https://dev.merawathafalan.my.id/api/v1/guess-surah?amount=3&select=1,112,113,114
```

### Response

Soal terletak pada bagian `results` berbentuk array. Untuk setiap soal memiliki 4 pilihan, dan jawaban yang benar adalah yang memiliki value `1`. Jika ada error, maka properti `error` akan berisi pesan error.

```json
{
  "error": null,
  "amount": 3,
  "select": [1, 112, 113, 114],
  "results": [
    {
      "id": 0,
      "questionText": "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      "questionVerseId": 6235,
      "options": [
        {
          "value": 0,
          "option": "Al-Fatihah"
        },
        {
          "value": 0,
          "option": "Al-Falaq"
        },
        {
          "value": 0,
          "option": "Al-Ikhlas"
        },
        {
          "value": 1,
          "option": "An-Nas"
        }
      ]
    },
    {
      "id": 1,
      "questionText": "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      "questionVerseId": 6229,
      "options": [
        {
          "value": 0,
          "option": "An-Nas"
        },
        {
          "value": 0,
          "option": "Al-Ikhlas"
        },
        {
          "value": 0,
          "option": "Al-Fatihah"
        },
        {
          "value": 1,
          "option": "Al-Falaq"
        }
      ]
    },
    {
      "id": 2,
      "questionText": "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      "questionVerseId": 5,
      "options": [
        {
          "value": 0,
          "option": "Al-Falaq"
        },
        {
          "value": 1,
          "option": "Al-Fatihah"
        },
        {
          "value": 0,
          "option": "An-Nas"
        },
        {
          "value": 0,
          "option": "Al-Ikhlas"
        }
      ]
    }
  ]
}
```

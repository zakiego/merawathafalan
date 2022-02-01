---
sidebar_position: 4
---

# Tebak Juz

## Description

Pemain diminta menebak nomor juz dari ayat yang ditampilkan.

Method: `GET`

```http
https://dev.merawathafalan.my.id/api/v1/guess-juz?select=1,2,3,4
```

## Paramater

| Name     | Type      | Description                                                              | Status   | Default Value |
| :------- | :-------- | :----------------------------------------------------------------------- | -------- | ------------- |
| `amount` | `integer` | Jumlah pertanyaan. Jumlah pertanyaan maksimal yang bisa dibuat adalah 50 | Optional | 1             |
| `select` | `integer` | Nomor dari juz, dipisahkan dengan koma, minimal memilih 4 juz            | Requried | -             |

\*Optional artinya tidak wajib ada, bisa untuk ditinggalkan. Karena valuenya akan secara otomatis menggunakan default value.

## Example

Misalkan, ingin membuat 3 pertanyaan dengan juz 1,2,3, dan 4.

:::danger
Juz yang dipilih minimal 4 juz

Select maksimal adalah 30, karena juz terakhir adalah juz 30
:::

```http
https://dev.merawathafalan.my.id/api/v1/guess-juz?amount=3&select=1,2,3,4
```

### Response

Soal terletak pada bagian `results` berbentuk array. Untuk setiap soal memiliki 4 pilihan, dan jawaban yang benar adalah yang memiliki value `1`. Jika ada error, maka properti `error` akan berisi pesan error.

```json
{
  "error": null,
  "amount": 3,
  "select": [1, 2, 3, 4],
  "results": [
    {
      "id": 0,
      "questionText": "قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا هِيَ إِنَّ الْبَقَرَ تَشَابَهَ عَلَيْنَا وَإِنَّا إِن شَاءَ اللَّهُ لَمُهْتَدُونَ",
      "questionVerseId": 77,
      "options": [
        {
          "value": 0,
          "option": 4
        },
        {
          "value": 1,
          "option": 1
        },
        {
          "value": 0,
          "option": 3
        },
        {
          "value": 0,
          "option": 2
        }
      ]
    },
    {
      "id": 1,
      "questionText": "وَقَالَتِ الْيَهُودُ لَيْسَتِ النَّصَارَىٰ عَلَىٰ شَيْءٍ وَقَالَتِ النَّصَارَىٰ لَيْسَتِ الْيَهُودُ عَلَىٰ شَيْءٍ وَهُمْ يَتْلُونَ الْكِتَابَ ۗ كَذَٰلِكَ قَالَ الَّذِينَ لَا يَعْلَمُونَ مِثْلَ قَوْلِهِمْ ۚ فَاللَّهُ يَحْكُمُ بَيْنَهُمْ يَوْمَ الْقِيَامَةِ فِيمَا كَانُوا فِيهِ يَخْتَلِفُونَ",
      "questionVerseId": 120,
      "options": [
        {
          "value": 0,
          "option": 3
        },
        {
          "value": 0,
          "option": 4
        },
        {
          "value": 0,
          "option": 2
        },
        {
          "value": 1,
          "option": 1
        }
      ]
    },
    {
      "id": 2,
      "questionText": "الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
      "questionVerseId": 281,
      "options": [
        {
          "value": 1,
          "option": 3
        },
        {
          "value": 0,
          "option": 2
        },
        {
          "value": 0,
          "option": 1
        },
        {
          "value": 0,
          "option": 4
        }
      ]
    }
  ]
}
```

# Nutrition Tracking API Data Structure

This directory contains sample data files that simulate the structure of the nutrition tracking API responses.

## Data Structure Overview

```json
{
  "user_id": 1,
  "username": "user_1",
  "period": {
    "start_date": "2023-01-01",
    "end_date": "2023-01-03",
    "days": 3
  },
  "targets": {
    "calories": 2200,
    "protein": 140,
    "carbs": 250,
    "fat": 70
  },
  "daily_data": [
    {
      "date": "2023-01-01",
      "macros": {
        "calories": {
            "amount": 2310, 
            "target": 2200},
        "protein": {
            "amount": 155, 
            "target": 140, 
            "unit": "g"},
        "carbs": {
            "amount": 245, 
            "target": 250,
            "unit": "g"},
        "fat": {
            "amount": 72, 
            "target": 70, 
            "unit": "g"}
      },
      "micros": {
        "Vitamin C": {
            "amount": 85.2, 
            "unit": "mg", 
            "target": 90},
        "Calcium": {
            "amount": 950.6, 
            "unit": "mg",
            "target": 1000},
        "Iron": {
            "amount": 16.4, 
            "unit": "mg", 
            "target": 18}
      },
      "meals": {
        "breakfast": {
          "calories": 924,
          "protein": 62,
          "carbs": 98,
          "fat": 29,
          "foods": [
            {
              "name": "Oatmeal",
              "calories": 150,
              "protein": 5,
              "carbs": 27,
              "fat": 3,
              "portion": "1 cup",
              "quantity": 1.0
            } // other foods
          ]
        },
        "dinner": {
          "calories": 1386,
          "protein": 93,
          "carbs": 147,
          "fat": 43,
          "foods": [
            {
              "name": "Chicken Breast",
              "calories": 165,
              "protein": 31,
              "carbs": 0,
              "fat": 3.6,
              "portion": "1 breast",
              "quantity": 1.0
            } // other foods
          ]
        }
      }
    }
    // additional days
  ],
  "summary": {
    "averages": {
      "calories": 2240,
      "protein": 142
    }
  }
}

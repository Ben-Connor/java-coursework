# Nutrition Tracking API Data Structure

This directory contains sample data files that simulate the structure of the nutrition tracking API responses.

## Data Structure Overview

```json
{
  "user_id": 1,
  "username": "user_1",
  "period": {
    "start_date": "2023-04-16",
    "end_date": "2023-05-16",
    "days": 30
  },
  "targets": {
    "calories": 2200,
    "protein": 140,
    "carbs": 250,
    "fat": 70,
    "micros": {
      "Vitamin A": 900,
      "Vitamin C": 90
      // other micronutrients
    }
  },
  "daily_data": [
    {
      "date": "2023-04-16",
      "macros": {
        "calories": {"amount": 2310, "target": 2200},
        "protein": {"amount": 155, "target": 140, "unit": "g"},
        "carbs": {"amount": 245, "target": 250, "unit": "g"},
        "fat": {"amount": 72, "target": 70, "unit": "g"},
        "percent_targets_met": {
          "calories": 105,
          "protein": 111,
          "carbs": 98,
          "fat": 103
        }
      },
      "micros": {
        "Vitamin A": {"amount": 872.5, "unit": "μg", "target": 900},
        "Vitamin C": {"amount": 85.2, "unit": "mg", "target": 90}
        // other micronutrients
      },
      "meals": {
        "breakfast": {
          "calories": 577,
          "protein": 31,
          "carbs": 73,
          "fat": 14,
          "foods": [
            {
              "name": "Oatmeal",
              "calories": 150,
              "protein": 5,
              "carbs": 27,
              "fat": 3,
              "portion": "1 cup",
              "quantity": 1.2
            }
            // other foods
          ]
        }
        // other meals (lunch, dinner, snacks)
      }
    }
    // additional days
  ],
  "summary": {
    "averages": {
      "calories": 2240,
      "protein": 142,
      "carbs": 238,
      "fat": 74
    },
    "compliance": {
      "calories": 86,
      "protein": 92,
      "carbs": 88,
      "fat": 82
    },
    "notable_days": {
      "best_calorie_day": "2023-04-28",
      "worst_calorie_day": "2023-05-02",
      "best_protein_day": "2023-04-22",
      "worst_protein_day": "2023-05-10"
    },
    "trends": {
      "calories": 120,
      "protein": 15
    },
    "micros": {
      "Vitamin A": {
        "average": 910.5,
        "compliance": 78,
        "unit": "μg"
      }
      // other micronutrients
    }
  }
}

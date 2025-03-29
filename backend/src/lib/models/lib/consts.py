from enum import StrEnum


class Nutrient(StrEnum):
    CALORIES = "calories"
    PROTEIN = "protein"
    CARBOHYDRATES = "carbohydrates"
    FAT = "fat"
    SUGAR = "sugar"
    VITAMIN_C = "vitamin_c"
    VITAMIN_D = "vitamin_d"
    FIBRE = "fibre"


class NutrientUnit(StrEnum):
    CALORIES = "kcal"
    GRAMS = "g"
    MILLI_GRAMS = "mg"
    MICRO_GRAMS = "μg"

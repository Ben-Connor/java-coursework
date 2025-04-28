from ...lib.models import UserModel, FoodEntryModel, NutrientEntryModel, TargetModel, NutrientTargetModel
from ...lib.models.lib.consts import Nutrient, NutrientUnit


USER_001 = UserModel(
    id=1,
    username="Test Username",
    email="test_username@email.com",
    password_hash="hashed_password",
)
CHICKEN_ENTRY = FoodEntryModel(
    id=1,
    name="Chicken Breast",
    user_id=USER_001.id,
)
CHICKEN_NUTRIENT_ENTRIES = [
    NutrientEntryModel(
        id=1,
        name=Nutrient.CALORIES,
        quantity=500,
        unit=NutrientUnit.CALORIES,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
    NutrientEntryModel(
        id=2,
        name=Nutrient.PROTEIN,
        quantity=60,
        unit=NutrientUnit.GRAMS,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
    NutrientEntryModel(
        id=3,
        name=Nutrient.CARBOHYDRATES,
        quantity=0,
        unit=NutrientUnit.GRAMS,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
    NutrientEntryModel(
        id=4,
        name=Nutrient.FAT,
        quantity=26,
        unit=NutrientUnit.GRAMS,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
    NutrientEntryModel(
        id=5,
        name=Nutrient.SUGAR,
        quantity=0,
        unit=NutrientUnit.GRAMS,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
    NutrientEntryModel(
        id=6,
        name=Nutrient.VITAMIN_C,
        quantity=0,
        unit=NutrientUnit.MILLI_GRAMS,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
    NutrientEntryModel(
        id=7,
        name=Nutrient.VITAMIN_D,
        quantity=0.2,
        unit=NutrientUnit.MICRO_GRAMS,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
    NutrientEntryModel(
        id=8,
        name=Nutrient.FIBRE,
        quantity=0,
        unit=NutrientUnit.GRAMS,
        food_entry_id=CHICKEN_ENTRY.id,
    ),
]
BULKING_TARGET = TargetModel(
    id=1,
    user_id=USER_001.id,
)
BULKING_NUTRIENT_TARGETS = [
    NutrientTargetModel(
        id=1,
        name=Nutrient.CALORIES,
        quantity=3_000,
        unit=NutrientUnit.CALORIES,
        target_id=BULKING_TARGET.id,
    ),
    NutrientTargetModel(
        id=2,
        name=Nutrient.PROTEIN,
        quantity=200,
        unit=NutrientUnit.GRAMS,
        target_id=BULKING_TARGET.id,
    ),
]

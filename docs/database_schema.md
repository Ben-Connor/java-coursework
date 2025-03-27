# SQL vs NoSQL

We chose to use SQL for the following reasons:  
(Currently only listed integrity as that's the main reason, although we could also list structured data and referential integrity.)

## Integrity

The integrity of the data in our app is extremely important, as any incorrect calculations could lead to our app suggesting users eat in a way that is harmful.  
For example, recommending someone eat far below their maintenance calories could lead to serious health complications and eating disorders.

SQL databases are **ACID compliant**, ensuring transactions are reliable, data remains secure, and no half-changed records exist. Constraints are enforced, and dirty reads are prevented.  
In contrast, NoSQL databases sacrifice this consistency and integrity for other benefits, each having its own pros and cons.

---

# How the Database Works at a High Level

When a user tries to input a food item, the application first checks if that food exists in an **external database** (e.g., USDA FoodData Central, Open Food Facts).

- **If the food exists**, it is retrieved from the external database. The system then adds the food to the `foods` table (if it doesn't already exist) via the `food_sources` table, creating a link to the external source.
- **If the food doesn’t exist** in the external database, it will be treated as a new entry in the `foods` table and added with user-specific data.
- Once the food is added, it is logged in **user-specific tables** (`user_macro_log`, `user_micro_log`), where individual servings are recorded.

# SQLAlchemy

The main reason we chose SQLAlchemy is because it integrated with the rest of our project the best. (Expand on this a bit)
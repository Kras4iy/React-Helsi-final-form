# Helsi registration form

Example of registration form with data verification to get the most reliable information from the user

-[Demo Link](https://kras4iy.github.io/React-Helsi-final-form/)

All required fields are marked `*`

+ The user's first and last name have been character-limited: min - 3 symbols and max - 20 symbols also in this place you can use only letters
+ Surname has similar limits but this field is optional
+ In РНОКПП you can use put only 10 numbers
+ All dates are checked for validity (you cant write 33.02.2020) also in the validation function it is possible to limit the input of future dates (it is very usefull in `birthday` and `date of issue`
+ In `date of expire` field you can put future dates
+ In select components you have ability to reset your choice, but you must chose something
+ Counry and City are checked only for the presence of non-letters and character-limited similar to `firstname`
+ In `secretWord` I left the ability to write numbers to increase reliability
+ In `phone` I used regexp to determine correct phone number writed in all popular ways
+ In `email` I just look for `@` and `.`
+ In the `passport series` you have the opportunity to indicate the old and new format
+ `authority` filling in the field is very different from passport to passport
+ `УНЗР` present only in the new passport format

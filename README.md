# mongoAssociationZoo
Use JavaScript and Mongoose to implement the "one-to-many" data model. 

git add README  
Using JavaScript and Mongoose, implement the "one-to-many" data model. The project includes two Mongoose models: "Zoo" and "Animal." In regard to the "one-to-many" association, "Zoo" is the Parent and "Animal" is the Child. One Zoo one will have many Animals. In other words, Animals belong to a Zoo. We can have a Zoo without any Animals; however, we cannot have an Animal without a Zoo. 

Nested routes are used for the 2 accociated models.  
Nested Route: zoos/:zoo_id/animals/:id   

CRUD is implemented for both Zoos and Animals.   

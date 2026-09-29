const CATEGORY_IMAGES = {
    Technical: "images/categories/technical.jpg",
    Food: "images/categories/food.jpg",
    Travel: "images/categories/travel.jpg",
    Interior: "images/categories/interior.jpg",
    Craft: "images/categories/craft.jpg",
    Music: "images/categories/music.jpg",
    Nature: "images/categories/nature.jpg",
    Dresses: "images/categories/dresses.jpg",
    Climate: "images/categories/climate.jpg"
};

function getCategoryImage(category) {
    return CATEGORY_IMAGES[category] || "images/default-blog.jpg";
}
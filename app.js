var categories = [
    {
         CategoryId: 100,
         ParentCategoryId: -1,
         Name: 'Business',
         Keywords:'Money'
    },
    {
        CategoryId: 200,
        ParentCategoryId: -1,
        Name: 'Tutoring',
        Keywords:'Teaching'
    },
    {
        CategoryId: 101,
        ParentCategoryId: 100,
        Name: 'Accounting',
        Keywords:'Taxes'
    },
    {
        CategoryId: 102,
        ParentCategoryId: 100,
        Name: 'Taxation',
        Keywords:''
    },
    {
        CategoryId: 201,
        ParentCategoryId: 200,
        Name: 'Computer',
        Keywords:''
    },
    {
        CategoryId: 103,
        ParentCategoryId: 101,
        Name: 'Corporate Tax',
        Keywords:''
    },
    {
        CategoryId: 202,
        ParentCategoryId: 201,
        Name: 'Operating System',
        Keywords:''
    },
    {
        CategoryId: 109,
        ParentCategoryId: 101,
        Name: 'Small business Tax',
        Keywords:''
    }
  ];

  function checkForKeywords(categories, parentId){
      var keyword ;

    categories.forEach(function(category){
        if(category.CategoryId == parentId){
            if(category.Keywords != ''){
            keyword = category.Keywords;
            
         }else{
            keyword = category.Keywords;
            parentId = category.ParentCategoryId;
            if(keyword == '' || parentId != -1){
                keyword = checkForKeywords(categories, parentId);
                
            }
         }
        }
        });
        return keyword;
  }

  function addLevelToCategory(categories){
      var hierarchyLevel = 0;

    categories.forEach(function(category){

        if(category.ParentCategoryId == -1){
            category.Level = 1;
        }else{
            hierarchyLevel = checkSecondLevel(category.ParentCategoryId);
            category.Level = hierarchyLevel;
        }

    })
  }

  function checkSecondLevel(id){
      var level;

    categories.forEach(function(category){
        if(category.CategoryId == id) {
            if(category.ParentCategoryId == -1){
                level = 2;
            }else{
                level = checkThirdLevel(category.ParentCategoryId);
            }
        }
    });

    return level;
  }

  function checkThirdLevel(id){
    var level;
        categories.forEach(function(category){
            if(category.CategoryId == id && category.ParentCategoryId == -1){
                level = 3;
            }
        });
        return level;
    }

 
$('.js-form').submit(function(event) {
    event.preventDefault();
    var userInput = $(event.currentTarget).find('#user-text');
    var finalKeyword ;
    categories.forEach(function(category){
       

        if(category.CategoryId == userInput.val()){
            if(category.Keywords == ''){
                var parentId = category.ParentCategoryId;
                finalKeyword = checkForKeywords(categories, parentId);


            }else{

                finalKeyword = category.Keywords;

            }
            $(".js-display-user-text").text('Output : ParentCategoryID = '+category.ParentCategoryId+',Name = '+category.Name+',Keywords = '+finalKeyword);
        }
        
    });
    userInput.val("");
  });

$('.js-form2').submit(function(event) {
    event.preventDefault();
    addLevelToCategory(categories);
    //console.log(categories);
    var input = $(event.currentTarget).find('#user-text-category');
    var output = [];

    categories.forEach(function(category){
        if(category.Level == input.val()){
           output.push(category.CategoryId);
        }
    })
    $(".js-display-user-text-category").text('Output :'+ output.sort());
    input.val("");
});     



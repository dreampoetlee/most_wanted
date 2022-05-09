/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":           
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `EyeColor: ${person.eyecolor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parent's PID: ${person.parents}\n`;
    personInfo += `Spouse's PID: ${person.currentSpouse}\n`;

    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
//todo Begining of the findPersonFamily() function
function findPersonFamily(person, people){
	//^Need list of person's parents
	let parentsList = people.filter(function(el) {
		if(person.parents.includes(el.id)) {
			return true;
		} else {
			return false;
		}
	})

	//^Need list of person's siblings
	let siblingsList = people.filter(function(el) {
		if(el.parents.includes(person.parents)) {
			return true;
		} else {
			return false;
		}
	})

	//^Need person's spouse
	let spouse = people.filter(function(el) {
		if(el.id === (person.currentSpouse)) {
			return true;
		} else {
			return false;
		}
	})

	//^Need to use the map() create a new array of family members
	let membersOfFamily = spouse.map(function(el) {
		return `Spouse: ${el.firstName} ${el.lastName}\n`;
	})

	membersOfFamily.push(siblingsList.map(function(el) {
		return `Sibiling(s): ${el.firstName} ${el.lastName}\n`;
	}))

	membersOfFamily.push(parentsList.map(function(el) {
		return `Parent(s): ${el.firstName} ${el.lastName}`
	}))

	return membersOfFamily.join(' ')
}
//todo end of findPersonFamily() function

//~Begining of the findPersonDescendants() function
function findPersonDescendants(person, people){
	//!Need an empty [] for childern
	let childern = [];
	//!Need an empty [] for grandchildren 
	let grandChildren = [];

	childern = people.filter(function(el) {
		if(el.parents.includes(childern.id)) {
			return true;
		} else {
			return false;
		}
	})

	childern.forEach(function(childern) {
		grandChildren = (people.filter(function(el) {
			if(el.parents.includes(childern.id)) {
				return true;
			} else {
				return false;
			}
		}))
	})

	let descendants = childern.concat(grandChildren)
	return descendants.map(function(el) {
		return `${el.firstName} ${el.lastName}\n`
	}).join('')
}
//~End of the findPersonsDescendants() function

//todo Begining of the search by traits group
function listOfTraits(differentTraits){
	let traitsList = []
	for (let i = 0; i < differentTraits; i++) {
		traitsList.push(prompt(`Please enter trait ${differentTraits}`))
	}
	return traitsList
}
// ?Need to ask the user if they're gonna search by single or multipe traits
function searchByTraits(people) {
	let traitSelector = prompt(`Are you searching by one or more traits? Type 'single' or 'multiple`)
	traitSelector.toLowerCase()
	if(traitSelector === 'single') {
		return individualTraits(people)
	} else if (traitSelector === 'multiple') {
		return traitMenu(people)
	} else {
		alert('Invalid input, please try again')
		return searchByTraits(people)
	}
}

//?Need to create a menu list of the various traits
function traitMenu(people) {
	let chosenTrait = people;
	let filterAgain = true;
	let optionCounter = 0;
	while (filterAgain === true) {
		let filterStatment = prompt(`You have chosen to filter by multiple propertites, \n Please select the various options that you would like to filter for one at a time. \n Filter Options: "Gender", "DOB", "Height", "Weight", "Eye Color", "Occupation", "Submit" `);

		switch(filterStatment) {
			case 'gender':
				chosenTrait = filterGender(chosenTrait)
				break;
			case 'dob':
				chosenTrait = filterDOB(chosenTrait)
				break;
			case 'height':
				chosenTrait = filterHeight(chosenTrait)
				break;
			case 'weight':
				chosenTrait = filterWeight(chosenTrait)
				break;
			case 'eye color':
				chosenTrait = filterEyeColor(chosenTrait)
				break;
			case 'occupation':
				chosenTrait = filterOccupation(chosenTrait)
				break;
			case 'submit':
				filterAgain = false
				break;
		}
	}
	return pickFromOptions(chosenTrait)
}

function pickFromOptions(people) {
	let personSelected = prompt(
		`Type the first name of the person that you're looking for from the given options:\n If empty, no person was found \n` +
		people.map(function(person) {
			return `${person.firstName} ${person.lastName}`;
		}).join('\n')
	);
	return people.filter(function(el) {
		if (el.firstName === personSelected) {
			return true;
		} else {
			return false;
		}
	})
}
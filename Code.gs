function onEdit(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var sheetName = sheet.getName();

  if (sheetName == "Heroes") {
    var eRange = e.range;
    var row = eRange.getRow();
    var column = eRange.getColumn();
    var heroName1 = sheet.getRange(2, 17).getValue();
    var heroName2 = sheet.getRange(2, 18).getValue();
    var heroName3 = sheet.getRange(2, 19).getValue();
    var heroName4 = sheet.getRange(2, 20).getValue();
    var namesNotNull = (heroName1 != "" ||
                        heroName2 != "" ||
                        heroName3 != "" ||
                        heroName4 != "");

    if (namesNotNull) {
      if (column >= 17 && column <= 20 && row == 2) {
        let filter = sheet.getFilter();
        if (filter) {
          filter.remove();
        }
        heroRange = sheet.getRange("A4:A88");
        heroRange.createFilter();
        let heroFilter = heroRange.getFilter();

        var hiddenHeroes = hideHeroes(heroRange.getValues(), heroName1, heroName2, heroName3, heroName4);
        
        let criteria = SpreadsheetApp.newFilterCriteria()
          .setHiddenValues(hiddenHeroes)
          .build();
        heroFilter.setColumnFilterCriteria(1, criteria);
      }
    }
  }
}

function hideHeroes(heroList, heroName1, heroName2, heroName3, heroName4) {
  filteredList1 = heroList.filter(hero => hero != heroName1);
  filteredList2 = filteredList1.filter(hero => hero != heroName2);
  filteredList3 = filteredList2.filter(hero => hero != heroName3);
  filteredListFinal = filteredList3.filter(hero => hero != heroName4);

  // The for-loop is necessary due to the the name of Aranna and Vanndar having
  // a trailing whitespace in the data. Can probably be removed if fixed
  for (let i = 0; i < filteredListFinal.length; i++) {
    var heroName = filteredListFinal[i][0];
    if(heroName == "Vanndar " || heroName == "Aranna ") {
      filteredListFinal[i][0] = filteredListFinal[i][0].trim()
    }
  }

  return filteredListFinal;
}

function resetHeroesFilter() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  range = sheet.getRange("Q2:T2");
  range.clearContent();
  let filter = sheet.getFilter();
  if (filter) {
    filter.remove();
  }
}

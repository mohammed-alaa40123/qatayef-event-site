/**
 * QatAIyef: AI Engineering Nights - Google Apps Script
 * Handles both GET and POST submissions from the registration website
 * Deploy as: Web App → Execute as: Me → Who has access: Anyone
 */

function doGet(e) {
  return handleSubmission(e);
}

function doPost(e) {
  return handleSubmission(e);
}

function handleSubmission(e) {
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("Sheet1") || spreadsheet.getSheets()[0];
    
    // Get parameters from either GET or POST
    var data = e.parameter || {};
    
    // Create headers if first row is empty
    if (sheet.getLastRow() === 0) {
      var headers = ["Timestamp", "Name", "Email", "Phone", "University", "Position", "IEEE Status", "IEEE Membership ID", "Resume URL"];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Get Cairo timestamp
    var timestamp = Utilities.formatDate(new Date(), "Africa/Cairo", "yyyy-MM-dd HH:mm:ss");
    
    // Append row
    var rowData = [
      timestamp,
      data.name || "",
      data.email || "",
      data.phone || "",
      data.university || "",
      data.position || "",
      data.ieeeStatus || "",
      data.ieeeMembershipId || "",
      data.resumeUrl || ""
    ];
    
    sheet.appendRow(rowData);
    
    // Return success (visible for GET requests)
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Registration saved"
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - run this in the script editor to verify it works
function testSubmission() {
  var testEvent = {
    parameter: {
      name: "Test User",
      email: "test@example.com",
      phone: "+20 123 456 7890",
      university: "Test University",
      position: "Student",
      ieeeStatus: "not-member",
      ieeeMembershipId: "N/A",
      resumeUrl: "N/A"
    }
  };
  
  var result = handleSubmission(testEvent);
  Logger.log(result.getContent());
}

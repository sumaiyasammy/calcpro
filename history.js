/* =========================================
   CalcPro History Manager
   ========================================= */

const CALCPRO_HISTORY_KEY = "calcpro_history";


/* Save a calculation */

function saveCalculation(expression, result, mode = "General") {
  
  if (
    expression === undefined ||
    expression === null ||
    result === undefined ||
    result === null
  ) {
    return;
  }
  
  const history = getCalculationHistory();
  
  history.unshift({
    expression: String(expression),
    result: String(result),
    mode: String(mode),
    time: new Date().toISOString()
  });
  
  /*
    সর্বোচ্চ 100টি হিসাব রাখা হবে।
    নতুন হিসাব সবসময় উপরে থাকবে।
  */
  
  const limitedHistory =
    history.slice(0, 100);
  
  localStorage.setItem(
    CALCPRO_HISTORY_KEY,
    JSON.stringify(limitedHistory)
  );
}


/* Get all history */

function getCalculationHistory() {
  
  try {
    
    const data =
      localStorage.getItem(
        CALCPRO_HISTORY_KEY
      );
    
    if (!data) {
      return [];
    }
    
    const history =
      JSON.parse(data);
    
    if (!Array.isArray(history)) {
      return [];
    }
    
    return history;
    
  } catch (error) {
    
    console.error(
      "History read error:",
      error
    );
    
    return [];
    
  }
}


/* Delete one history item */

function deleteCalculation(index) {
  
  const history =
    getCalculationHistory();
  
  if (
    index < 0 ||
    index >= history.length
  ) {
    return;
  }
  
  history.splice(index, 1);
  
  localStorage.setItem(
    CALCPRO_HISTORY_KEY,
    JSON.stringify(history)
  );
}


/* Clear complete history */

function clearCalculationHistory() {
  
  localStorage.removeItem(
    CALCPRO_HISTORY_KEY
  );
  
}


/* Get latest calculation */

function getLatestCalculation() {
  
  const history =
    getCalculationHistory();
  
  if (history.length === 0) {
    return null;
  }
  
  return history[0];
}


/* Copy result */

async function copyCalculationResult(result) {
  
  try {
    
    await navigator.clipboard.writeText(
      String(result)
    );
    
    return true;
    
  } catch (error) {
    
    console.error(
      "Copy error:",
      error
    );
    
    return false;
    
  }
}


/* =========================================
   Optional helper
   ========================================= */

function formatCalculationTime(time) {
  
  const date =
    new Date(time);
  
  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }
  
  return date.toLocaleString();
  
}
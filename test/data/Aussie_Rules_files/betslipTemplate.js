// declare package:betslipTemplate
if(typeof(betslipTemplate)=="undefined")betslipTemplate={}
// template: slip
betslipTemplate.slip=function(data){
var _=[];
_.push(" <div id=\"slipAnchor\"> <div id=\"hintPanelContainer\" class=\"bfSlipHint\"></div> <div id=\"alertPanelContainer\"></div> ");
if ((data['liveMode'] == 1)) {
_.push(" <table border='0' cellspacing='0' cellpadding='0' class=\"slip_size_live\"> ");
} else {
_.push(" <table border='0' cellspacing='0' cellpadding='0' class=\"slip_size\"> ");
}
_.push(" <tr> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <td valign='top'><img width='5' height='53' src='");
_.push(data['urls']['holder_ml']);
_.push("'></td> ");
} else {
_.push(" <td valign='top'><img width='5' height='53' src='");
_.push(data['urls']['freebet_holder_ml']);
_.push("'></td> ");
}
_.push(" <td rowspan='2' align='center' valign='top'> <form name='");
_.push(data['formName']);
_.push("' method='post' action='");
_.push(data['formAction']);
_.push("' ");
_.push(data['style']);
_.push(" ");
_.push(data['formTarget']);
_.push(" class='bfContainer'> <table width=\"100%\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\" align=\"center\" class=\"bfContainer\"> <tr> <td> <div id=\"headerPanelContainer\"></div> <div id=\"selectionPanelContainer\" ");
if ((data['isSelectionView'])) {
_.push(" class='slipArrw' ");
}
_.push(" > </div> <span id='visibilityAnchor'></span> <div id=\"multiWayPanelContainer\"></div> <div id=\"comboPanelContainer\"></div> </td> </tr> </table> </form> <div id=\"totalPanelContainer\"></div> </td> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <td valign='top'><img width='5' height='53' src='");
_.push(data['urls']['holder_mr']);
_.push("'></td> ");
} else {
_.push(" <td valign='top'><img width='5' height='53' src='");
_.push(data['urls']['freebet_holder_mr']);
_.push("'></td> ");
}
_.push(" </tr> <tr> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <td valign='bottom' align='right'><img width='5' class=\"slipleftholderbl\" src='");
_.push(data['urls']['holder_bl']);
_.push("'></td> <td valign='bottom' align='left'><img width='5' src='");
_.push(data['urls']['holder_br']);
_.push("'></td> ");
} else {
_.push(" <td valign='bottom' align='right'><img width='5' class=\"slipleftholderbl\" src='");
_.push(data['urls']['freebet_holder_bl']);
_.push("'></td> <td valign='bottom' align='left'><img width='5' src='");
_.push(data['urls']['freebet_holder_br']);
_.push("'></td> ");
}
_.push(" </tr> </table> <table width=\"300\" border='0' cellspacing='0' cellpadding='0'> <tr></tr> <tr><td colspan='3' align='right'><div id=\"buttonContainer\" class=\"secondTableForButton\"></div></td><td></td></tr> <tr><td colspan='3'><div id=\"replyMessageContainer\"></div></td></tr> </table> <div id=\"liveProgressBarContainer\" style=\"width:280px;\"></div> <div id=\"disclaimerContainer\"></div> </div> ");
return _.join("");
}
// template: slipHint
betslipTemplate.slipHint=function(data){
var _=[];
_.push(" <div id=\"hintPanelAnchor\"> ");
if ((data['showHintPanel'])) {
if ((data['showErrorMsg'])) {
_.push(" <div id=\"errorContainer\" class=\"bfSlipHintError\">");
_.push(data['errorMsg']);
_.push("</div> ");
}
_.push(" <div id=\"slipHintLinkDiv\" ");
if ((data['freeBetMode'] != 1)) {
_.push(" class=\"bfSlipHintLinkContainer\" ");
} else {
_.push(" class=\"bfSlipHintLinkFreebetContainer\" ");
}
_.push(" > <a href=\"#\" onclick=\"window.scrollTo(0,0);\"><span>");
_.push(data['checkedSelectionsText']);
_.push("</span><br> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <img src=\"");
_.push(data['urls']['slip_hint_arrow']);
_.push("\"> ");
} else {
_.push(" <img src=\"");
_.push(data['urls']['slip_hint_arrow_freebet']);
_.push("\"> ");
}
_.push(" <span>&nbsp;");
_.push(data['translations']["GO_THERE"]);
_.push("&nbsp;</span> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <img src=\"");
_.push(data['urls']['slip_hint_arrow']);
_.push("\"> ");
} else {
_.push(" <img src=\"");
_.push(data['urls']['slip_hint_arrow_freebet']);
_.push("\"> ");
}
_.push(" </a> </div> ");
}
_.push(" </div> ");
return _.join("");
}
// template: slipDisclaimerPanel
betslipTemplate.slipDisclaimerPanel=function(data){
var _=[];
_.push(" <div id=\"disclaimerPanelAnchor\"> <table class='disktable'> <tr><td valign='top'> ");
if ((data['selectionsCount'] > 0)) {
_.push(" <b> ");
_.push(data['translations']["SLIP_DISCLAIMER"]);
_.push(" </b> <br/> ");
_.push(data['translations']["SLIP_DISCLAIMER_TEXT1"]);
_.push(" ");
_.push(visitor.getCurrency());
_.push(" ");
_.push(data['maxBetTranslation']);
_.push(" ");
_.push(data['translations']["SLIP_DISCLAIMER_TEXT2"]);
_.push(" ");
}
_.push(" </td><tr> </table> </div> ");
return _.join("");
}
// template: slipHeaderSelection
betslipTemplate.slipHeaderSelection=function(data){
var _=[];
_.push(" <div align='left' id=\"headerSelectionPanelAnchor\" class=\"bfheadercolor\"> <table border='0' cellpadding='0' cellspacing='0' class='bfHeaderTbl bfStandartTbl ");
if (data['freeBetMode'] == 1) {
_.push(" bfFreeBetHeader ");
}
_.push(" '> ");
if ((data['liveMode'] == 1)) {
_.push(" <tr><td class='bfRedTD'>");
_.push(data['translations']["LIVE_BET_SLIP"]);
_.push("</td> ");
} else {
_.push(" <tr><td class='bfRedTD' align='left'>");
_.push(data['translations']["BET_SLIP"]);
_.push("</td> ");
}
_.push(" <td class='bfRedTD' align='right'> <a href='#' onClick='");
_.push(data['removeAllSelections']);
_.push("(); ");
_.push(data['notifyUserActivity']);
_.push("(); return false;' title='");
_.push(data['translations']["CLEAR_SLIP_22"]);
_.push("'>");
_.push(data['translations']["CLEAR_SLIP_22"]);
_.push("<img border='0' src='");
_.push(data['urls']['fbDelSlip']);
_.push("' align='absmiddle' width='11' height='11' style='margin: 0 0 0 5px;'/></a> </td> </tr> </table> </div> ");
return _.join("");
}
// template: slipSelectionFirstStep
betslipTemplate.slipSelectionFirstStep=function(data){
var _=[];
_.push(" <div id=\"selectionPanelAnchor\"> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr><td colspan='3'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr> <td width='20'> ");
if ((! data['hotComboAvailable'] && (data['allComboSelections'] >= 2))) {
_.push(" <input ");
if ((data['allComboSelections'] == data['checkedSelectionsNumber'])) {
_.push(" checked ");
} else {
}
_.push(" name=\"checkAll\" onclick=\"");
_.push(data['notifyUserActivity']);
_.push("(); return ");
_.push(data['editAllComboSelections']);
_.push("(this.checked)\" title=\"");
_.push(data['translations']["MSG_CHECK_ALL_CHECKBOX"]);
_.push("\" type=\"checkbox\"/> ");
}
_.push(" </td> <td class='bfDarkHeadStyleLeft' valign='middle'> ");
if ((!data['hotComboAvailable'])) {
_.push(" <b>");
_.push(data['translations']["SINGLES_SLIP_22"]);
_.push("</b> ");
} else {
_.push(" &nbsp; ");
}
_.push(" </td> </tr> </table> </td> <td class='bfDarkHeadStyle' align='left'> ");
if ((data['isTeaserBlockAvailable'])) {
_.push(" ");
_.push(data['translations']["TEASERS_SLIP"]);
_.push(" ");
} else {
if ((data['isBankersAvailable'] && data['isBankersShown'])) {
_.push(" ");
_.push(data['translations']["BANKERS_SLIP_22"]);
_.push(" ");
} else {
_.push(" &nbsp; ");
}
}
_.push(" </td> ");
if ((data['isEachWayAvailable'] && data['freeBetMode'] != 1)) {
_.push(" <td class='bfDarkHeadStyle' align='right'> <a href='#' onclick=\"return false;\" onmouseover=\"offsetx=170;offsety=0;return ");
_.push(data['showEachWayHelpBlock']);
_.push("();\" onmouseout=\"return nd();\">");
_.push(data['translations']['MSG_EW_SLIP']);
_.push("</a> </td> ");
} else {
_.push(" <td class='bfDarkHeadStyle'>&nbsp;</td> ");
}
_.push(" <td class='bfDarkHeadStyle' align='right'> ");
if (( data['freeBetMode'] == 1 )) {
_.push(" ");
_.push(data['translations']["FREEBET_SLIP_LABEL"]);
_.push(" ");
} else if ((!data['hotComboAvailable'])) {
if (( data['allselectionCount'] > 1 )) {
_.push(" ");
_.push(data['translations']["STAKES2_SLIP_22"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["STAKE_SLIP_22"]);
_.push(" ");
}
} else {
_.push(" &nbsp; ");
}
_.push(" </td> ");
if ((data['isMaxStakeShown'] && !data['hotComboAvailable'])) {
_.push(" <td class='bfDarkHeadStyle' align='right'>");
_.push(data['translations']["MAX_SLIP_22"]);
_.push("</td> ");
} else {
}
_.push(" </tr> ");
for(var orderIndex in data['sortedSelections']) {
            var selectionIndex = data['sortedSelections'][orderIndex];
            
_.push(" <tr id='slipSelection");
_.push(selectionIndex);
_.push("'> <td colspan='3'> <table border='0' cellpadding='0' cellspacing='0' class='bfSelectionTable'> <tr> <td valign='top' align='center' width='20'> ");
if (( data['selections'][selectionIndex].getEventRef().getComboFactor() == 1)) {
_.push(" <img src=\"");
_.push(data['urls']['s']);
_.push("\" title=\"");
_.push(data['translations']["SINGLE_SLIP_22"]);
_.push("\" onmouseout='return nd();'> ");
} else {
_.push(" <div ");
if ((data['selections'][selectionIndex].isProblematic())) {
_.push(" class=\"bfCheckHighlight\" ");
}
_.push(" > <input ");
if ((data['selections'][selectionIndex].isSelectionChecked())) {
_.push(" checked ");
}
if ((data['hotComboAvailable'])) {
_.push(" disabled ");
}
if ((data['selections'][selectionIndex].isLockedSelection())) {
_.push(" disabled ");
}
_.push(" name=\"");
_.push(data['selections'][selectionIndex].getEventRef().getId());
_.push("\" onClick=\"");
_.push(data['notifyUserActivity']);
_.push("(); return ");
_.push(data['editSelectionChecked']);
_.push("('");
_.push(selectionIndex);
_.push("',this.checked)\" type=\"checkbox\"/> </div> ");
}
_.push(" </td> <td class=\"bfEventTd\"> <div class='bfEventName' style='white-space: normal;'> ");
if ((! data['hotComboAvailable'])) {
_.push(" <a href=\"#\" onclick=\"");
_.push(data['removeSelection']);
_.push("('");
_.push(selectionIndex);
_.push("'); ");
_.push(data['notifyUserActivity']);
_.push("(); return false;\"><img border='0' src=\"");
_.push(data['urls']['fbDelSlip']);
_.push("\" width='11' height='11'></a>&nbsp; ");
}
_.push(" ");
_.push(data['selections'][selectionIndex].getEventRef().getName());
_.push(" </div> <div align=\"left\"> <span class=\"bfEventChoice\">");
_.push(data['selections'][selectionIndex].getOutcomeName());
_.push("</span>&nbsp;&nbsp;<span class='bfEventOdd'> ");
if ((!data['selections'][selectionIndex].isLockedSelection())) {
_.push(" <span id=\"slipOutcomeOdd_");
_.push(data['selections'][selectionIndex].getOutcomeId());
_.push("\"> ");
if ((data['hotComboAvailable'] && SlipConstants.ODD_STYLE_FRACTION == visitor.getEffectiveOddStyle())) {
_.push(" ");
_.push(to_odd(SlipConstants.ODD_STYLE_DECIMAL, data['selections'][selectionIndex].getOutcomeOdd()));
_.push(" ");
} else {
_.push(" ");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['selections'][selectionIndex].getOutcomeOdd(), data['selections'][selectionIndex].getOutcomeFractionOdd()));
_.push(" ");
}
_.push(" </span> ");
if ((data['liveMode'] == 1)) {
if ((data['liveOddsNotificationRegister'].isArrowUp(data['selections'][selectionIndex].getOutcomeId()))) {
_.push(" <img src=\"");
_.push(data['urls']['live_odd_arrow_up']());
_.push("\"> ");
}
if ((data['liveOddsNotificationRegister'].isArrowDown(data['selections'][selectionIndex].getOutcomeId()))) {
_.push(" <img src=\"");
_.push(data['urls']['live_odd_arrow_down']());
_.push("\"> ");
}
}
}
_.push(" </span> </div> </td> </tr> </table> </td> <td class='bfEventBanks' valign='top' align='center'>&nbsp; ");
if ((data['isBankersAvailable'] && data['isBankersShown'] && data['selections'][selectionIndex].getEventRef().isBankersOk() && data['selections'][selectionIndex].getEventRef().getComboFactor() != 1 && !data['isTeasersAvailable'])) {
_.push(" <input type=checkbox onclick=\"");
_.push(data['editBankerChecked']);
_.push("('");
_.push(selectionIndex);
_.push("',this.checked); ");
_.push(data['notifyUserActivity']);
_.push("();\" name='bnk");
_.push(selectionIndex);
_.push("' ");
if ((data['selections'][selectionIndex].isBankerChecked())) {
_.push(" checked ");
}
_.push(" > ");
}
if ((data['isTeaserBlockAvailable']  && data['selections'][selectionIndex].isTeaserPossible())) {
_.push(" <input type=checkbox onclick=\"return ");
_.push(data['editTeaserChecked']);
_.push("('");
_.push(selectionIndex);
_.push("');\" name='teasers");
_.push(selectionIndex);
_.push("' ");
if ((data['selections'][selectionIndex].isTeaserChecked())) {
_.push(" checked ");
}
_.push(" > ");
}
_.push(" </td> ");
if ((data['selections'][selectionIndex].isEachWayPossible() && data['freeBetMode'] != 1)) {
_.push(" <td valign='top' align='right' class='bfEventBanks'><input name='eachway_");
_.push(selectionIndex);
_.push("' onclick=\"");
_.push(data['editEachWayChecked']);
_.push("('");
_.push(selectionIndex);
_.push("')\" type='checkbox' ");
if ((data['selections'][selectionIndex].isEachWayChecked())) {
_.push(" checked ");
}
_.push(" /> </td> ");
} else {
_.push(" <td class='bfBetEventTdLeft'>&nbsp;</td> ");
}
_.push(" <td class='bfBetEventTd bfEventDarkGray bfXcastExplanation ");
if (data['freeBetMode'] == 1) {
_.push(" bfFreeBetEventTd ");
}
_.push(" ' valign='top' align='right'> ");
if (( data['selections'][selectionIndex].getEventRef().getComboFactor() < 2 )) {
if (( data['selections'][selectionIndex].isXCastAnyOrder() && data['freeBetMode'] != 1)) {
if (( data['selections'][selectionIndex].getBetsCount() == 2 )) {
_.push(" <a href='#' onClick='return false;' onMouseOver='ooffsetx=-110; ooffsety=0; return ");
_.push(data['showAditionalHelpBlock']);
_.push("(escape(\" ");
_.push(data['translations']['MSG_FCAST_BETS_COUNT']);
_.push(" \"), 100);' onMouseOut='return nd();'>");
_.push(data['selections'][selectionIndex].getBetsCount());
_.push("*</a>&nbsp; ");
} else {
_.push(" <a href='#' onClick='return false;' onMouseOver='ooffsetx=-110; ooffsety=0; return ");
_.push(data['showAditionalHelpBlock']);
_.push("(escape(\" ");
_.push(data['translations']['MSG_TCAST_BETS_COUNT']);
_.push(" \"), 100);' onMouseOut='return nd();'>");
_.push(data['selections'][selectionIndex].getBetsCount());
_.push("*</a>&nbsp; ");
}
}
if ((! data['hotComboAvailable'] && !data['selections'][selectionIndex].isLockedSelection() && data['freeBetMode'] != 1)) {
_.push(" <input class='checkStyle' maxlength=8 name='");
_.push(data['stakeBoxRegister'].registerStakeBox('st' + selectionIndex));
_.push("' size='3' onKeyUp='");
_.push(data['editStake']);
_.push("(\"");
_.push(selectionIndex);
_.push("\",this.value);' onkeypress=\"");
_.push(data['stakeTabOrder']);
_.push("(");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push(", event)\" tabindex=\"");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push("\" value= ");
if (( data['selections'][selectionIndex].getDisplayStake() != "" )) {
_.push(" \"");
_.push(data['selections'][selectionIndex].getDisplayStake());
_.push("\" ");
} else {
_.push(" \"\" ");
}
_.push(" > ");
} else if (((! data['hotComboAvailable'] && !data['selections'][selectionIndex].isXCastAnyOrder() && !data['selections'][selectionIndex].isLockedSelection() && data['freeBetMode'] == 1))) {
if (( data['selections'][selectionIndex].getDisplayStake() != "" && data['selections'][selectionIndex].getDisplayStake() != null )) {
_.push(" <strong>");
_.push(to_mn(data['selections'][selectionIndex].getDisplayStake()) + (visitor.getCurrency() ? " " + visitor.getCurrency() : ""));
_.push("</strong> ");
}
_.push(" <input type=\"radio\" value=\"");
_.push(visitor.getFreeBetAmount());
_.push("\" name=\"freeBetSelection\" onclick='");
_.push(data['editStake']);
_.push("(\"");
_.push(selectionIndex);
_.push("\", this.value);' ");
if (( data['selections'][selectionIndex].getDisplayStake() != "" && data['selections'][selectionIndex].getDisplayStake() != null )) {
_.push(" checked=\"checked\" ");
}
_.push(" /> ");
} else {
_.push(" &nbsp; ");
}
} else {
_.push(" &nbsp; ");
}
_.push(" </td> ");
if ((data['isMaxStakeShown'] && ! data['hotComboAvailable'])) {
_.push(" <td class='bfBetEventTd bfEventDarkGray bfXcastExplanation' valign='top' align='right'>");
_.push(data['selections'][selectionIndex].getMaxStake());
_.push("</td> ");
}
_.push(" </tr> ");
}
_.push(" </table> <div class='slipGrad' /> </div> ");
return _.join("");
}
// template: headerConfirmation
betslipTemplate.headerConfirmation=function(data){
var _=[];
_.push(" <div align='left' id=\"headerConfirmationPanelAnchor\" class=\"bfheadercolor\"> <table border='0' cellpadding='0' cellspacing='0' class='bfHeaderTbl bfStandartTbl ");
if (data['freeBetMode'] == 1) {
_.push(" bfFreeBetHeader ");
}
_.push(" '> ");
if ((data['liveMode'] == 1)) {
_.push(" <tr><td class='bfRedTD'>");
_.push(data['translations']["LIVE_BET_SLIP"]);
_.push("</td> ");
} else {
_.push(" <tr><td class='bfRedTD' align='left'>");
_.push(data['translations']["BET_SLIP"]);
_.push("</td> ");
}
_.push(" <td class='bfRedTD' align='right'> <img src='");
_.push(data['urls']['bfReturn']);
_.push("' border='0' align='absmiddle'> <a href='#' onClick='");
_.push(data['returnToFirstView']);
_.push("(); return false;' title='");
_.push(data['translations']["RETURN_TO_SLIP_22"]);
_.push("'><font size=-2>");
_.push(data['translations']["RETURN_TO_SLIP_22"]);
_.push("</font></a> </td> </tr> </table> </div> ");
return _.join("");
}
// template: headerReport
betslipTemplate.headerReport=function(data){
var _=[];
_.push(" <div align='left' id=\"headerReportPanelAnchor\" class=\"bfheadercolor\"> <table border='0' cellpadding='0' cellspacing='0' class='bfHeaderTbl bfStandartTbl ");
if (data['freeBetMode'] == 1) {
_.push(" bfFreeBetHeader ");
}
_.push(" '> ");
if ((data['liveMode'] == 1)) {
_.push(" <tr><td class='bfRedTD'>");
_.push(data['translations']["LIVE_BET_SLIP"]);
_.push("</td> ");
} else {
_.push(" <tr><td class='bfRedTD' align='left'>");
_.push(data['translations']["BET_SLIP"]);
_.push("</td> ");
}
_.push(" <td class='bfRedTD' align='right'>&nbsp; </td> </tr> </table> </div> ");
return _.join("");
}
// template: selectionConfirmation
betslipTemplate.selectionConfirmation=function(data){
var _=[];
_.push(" <div align='left'class='bfWhiteLineBot' id=\"selectionConfirmationPanelAnchor\"> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%' > <tr><td class='bfDarkHeadStyleLeft'> <b>");
_.push(data['translations']["CONFIRM_YOUR_BET_SLIP_22"]);
_.push("</b> </td> <td class='bfDarkHeadStyle' align='right' valign='middle'> ");
if (( data['freeBetMode'] == 1 )) {
_.push(" ");
_.push(data['translations']["FREEBET_SLIP_LABEL"]);
_.push(" ");
} else if (( data['allselectionCount'] > 1 )) {
_.push(" ");
_.push(data['translations']["STAKES2_SLIP_22"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["STAKE_SLIP_22"]);
_.push(" ");
}
_.push(" </td> </tr> ");
for(var orderIndex in data['sortedSelections']) {
				var selectionIndex = data['sortedSelections'][orderIndex];
				
if ((data['selections'][selectionIndex].isLockedSelection())) {
} else {
if (( ( !data['selections'][selectionIndex].isSelectionChecked() &&  data['selections'][selectionIndex].getStake() == 0 && !data['selections'][selectionIndex].isTeaserChecked()  ) || (data['selections'][selectionIndex].isSelectionChecked() && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() == 1 && !data['selections'][selectionIndex].isTeaserChecked()) || (data['selections'][selectionIndex].isSelectionChecked() && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() != 1 && !data['isComboPlaced'] && !data['selections'][selectionIndex].isTeaserChecked()))) {
} else {
if (((data['selections'][selectionIndex].isTeaserChecked() && !data['teaserBetPlaced'] && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() == 1) || ( !data['selections'][selectionIndex].isSelectionChecked() && data['selections'][selectionIndex].isTeaserChecked() && !data['teaserBetPlaced'] && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() != 1 ) || (data['selections'][selectionIndex].isTeaserChecked() && !data['teaserBetPlaced'] && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() != 1 && !data['isComboPlaced'] ))) {
} else {
_.push(" <tr> <td class='bfBetEventTdLeft'> <table border='0' cellpadding='0' cellspacing='0' class='bfSelectionTable'> <tr><td align='center' class='bfEventTd' style='border:none;' width='20'> <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['getClosingTimeHtml']);
_.push("('");
_.push(data['selections'][selectionIndex].getEventRef().getCloseTime());
_.push("');\" onmouseout='offsetx=130;offsety=220;return nd();'> <img src='");
_.push(data['urls']['bfInfo']);
_.push("' border='0'> </a> </td><td class='bfEventTd' style='border:none;'> <div class='bfEventName'>");
_.push(data['selections'][selectionIndex].getEventRef().getName());
_.push("</div> <div><span class='bfEventChoice' style='padding-left:4px;'>");
_.push(data['selections'][selectionIndex].getOutcomeName());
_.push(" ");
if (( data['selections'][selectionIndex].isTeaserChecked() && data['teaserBetPlaced'])) {
_.push(" <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['teasersHelp']);
_.push("();\" onmouseout='offsetx=130;offsety=220;return nd();' style='font-weight:normal; text-decoration:none;'>[t]</a> ");
}
if (( data['selections'][selectionIndex].isBankerChecked() && data['isComboPlaced'] && !data['teaserBetPlaced'] && data['withBankers'])) {
_.push(" <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['bankersHelp']);
_.push("();\" onmouseout='offsetx=130;offsety=220;return nd();' style='font-weight:normal; text-decoration:none;'>[b]</a> ");
}
if ((data['selections'][selectionIndex].isEachWayChecked() && data['selections'][selectionIndex].getStake() > 0)) {
_.push(" <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['eachwayHelp']);
_.push("();\" onmouseout='offsetx=130;offsety=220;return nd();' style='font-weight:normal; text-decoration:none;'><nobr>[");
_.push(data['translations']["MSG_EW_SLIP"]);
_.push("]</nobr></a> ");
}
_.push(" </span> <span class='bfEventOdd'> ");
if ((data['hotComboAvailable'] && SlipConstants.ODD_STYLE_FRACTION == visitor.getEffectiveOddStyle())) {
_.push(" ");
_.push(to_odd(SlipConstants.ODD_STYLE_DECIMAL, data['selections'][selectionIndex].getOutcomeOdd()));
_.push(" ");
} else {
_.push(" ");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['selections'][selectionIndex].getOutcomeOdd(), data['selections'][selectionIndex].getOutcomeFractionOdd()));
_.push(" ");
}
_.push(" </span> </div> </td></tr> </table> </td> <td class='bfBetEventTd bfEventDarkGray bfRightFix' align='right'> <img src=' ");
if (( data['selections'][selectionIndex].isTeaserChecked() && data['teaserBetPlaced'] && !(data['selections'][selectionIndex].isSelectionChecked()))) {
_.push(" ");
_.push(data['urls']['tb']);
_.push("' title='");
_.push(data['translations']["TEASER_SELECTION_SLIP"]);
_.push("' > ");
} else {
if ((!(data['selections'][selectionIndex].isSelectionChecked()))) {
_.push(" ");
_.push(data['urls']['n']);
_.push("' height='1' width='1' > ");
}
}
_.push(" <img src=' ");
if (( (data['selections'][selectionIndex].isSelectionChecked() == false ) &&  data['selections'][selectionIndex].getStake() > 0 )) {
_.push(" ");
_.push(data['urls']['sb']);
_.push("' title='");
_.push(data['translations']["SINGLE_SLIP_22"]);
_.push("'><br/> ");
} else {
_.push(" ");
_.push(data['urls']['n']);
_.push("' height='1' width='1'><br/> ");
}
_.push(" <b> ");
if (( data['selections'][selectionIndex].getEventRef().getComboFactor() < 2)) {
if (( data['selections'][selectionIndex].getStake() == 0)) {
} else {
_.push(" ");
_.push(((typeof(data['currencySymbol']) != 'undefined' )? data['currencySymbol'] : ""));
_.push(" ");
_.push(to_mn(data['selections'][selectionIndex].getStake()));
_.push(" ");
_.push(visitor.getCurrency());
_.push(" ");
}
} else {
_.push(" &nbsp;&nbsp;&nbsp;&nbsp ");
}
_.push(" </b> </td> </tr> ");
}
}
}
}
_.push(" </table> <div class='slipGradBtm'></div> </div> ");
return _.join("");
}
// template: selectionReport
betslipTemplate.selectionReport=function(data){
var _=[];
_.push(" <div align='left'class='bfWhiteLineBot' id=\"selectionReportPanelAnchor\"> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%' > <tr><td class='bfDarkHeadStyleLeft'> ");
if ((data['slipFailed'])) {
_.push(" <b>");
_.push(data['translations']["PROBLEM_SLIP_22"]);
_.push("</b> ");
} else {
_.push(" <b>");
_.push(data['translations']["GOOD_LUCK_SLIP_22"]);
_.push("</b> ");
}
_.push(" </td> <td class='bfDarkHeadStyle' align='right' valign='middle'> ");
if ((data['freeBetMode'] == 1)) {
_.push(" ");
_.push(data['translations']["FREEBET_SLIP_LABEL"]);
_.push(" ");
} else if (( data['allselectionCount'] > 1 )) {
_.push(" ");
_.push(data['translations']["STAKES2_SLIP_22"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["STAKE_SLIP_22"]);
_.push(" ");
}
_.push(" </td> </tr> ");
for(var orderIndex in data['sortedSelections']) {
				var selectionIndex = data['sortedSelections'][orderIndex];
				
if ((data['selections'][selectionIndex].isLockedSelection())) {
} else {
if (( ( !data['selections'][selectionIndex].isSelectionChecked() &&  data['selections'][selectionIndex].getStake() == 0 && !data['selections'][selectionIndex].isTeaserChecked()  ) || (data['selections'][selectionIndex].isSelectionChecked() && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() == 1 && !data['selections'][selectionIndex].isTeaserChecked()) || (data['selections'][selectionIndex].isSelectionChecked() && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() != 1 && !data['isComboPlaced'] && !data['selections'][selectionIndex].isTeaserChecked()))) {
} else {
if (((data['selections'][selectionIndex].isTeaserChecked() && !data['teaserBetPlaced'] && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() == 1) || ( !data['selections'][selectionIndex].isSelectionChecked() && data['selections'][selectionIndex].isTeaserChecked() && !data['teaserBetPlaced'] && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() != 1 ) || (data['selections'][selectionIndex].isTeaserChecked() && !data['teaserBetPlaced'] && data['selections'][selectionIndex].getStake() == 0 && data['selections'][selectionIndex].getEventRef().getComboFactor() != 1 && !data['isComboPlaced'] ))) {
} else {
_.push(" <tr> <td class='bfBetEventTdLeft'> <table border='0' cellpadding='0' cellspacing='0' class='bfSelectionTable'> <tr><td align='center' class='bfEventTd' style='border:none;' width='20'> <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['getClosingTimeHtml']);
_.push("('");
_.push(data['selections'][selectionIndex].getEventRef().getCloseTime());
_.push("');\" onmouseout='offsetx=130;offsety=220;return nd();'> <img src='");
_.push(data['urls']['bfInfo']);
_.push("' border='0'> </a> </td><td class='bfEventTd' style='border:none;'> <div class='bfEventName'>");
_.push(data['selections'][selectionIndex].getEventRef().getName());
_.push("</div> <div><span class='bfEventChoice' style='padding-left:4px;'>");
_.push(data['selections'][selectionIndex].getOutcomeName());
_.push(" ");
if (( data['selections'][selectionIndex].isTeaserChecked() && data['teaserBetPlaced'])) {
_.push(" <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['teasersHelp']);
_.push("();\" onmouseout='offsetx=130;offsety=220;return nd();' style='font-weight:normal; text-decoration:none;'>[t]</a> ");
}
if (( data['selections'][selectionIndex].isBankerChecked() && data['isComboPlaced'] && !data['teaserBetPlaced'] && data['withBankers'])) {
_.push(" <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['bankersHelp']);
_.push("();\" onmouseout='offsetx=130;offsety=220;return nd();' style='font-weight:normal; text-decoration:none;'>[b]</a> ");
}
if ((data['selections'][selectionIndex].isEachWayChecked() && data['selections'][selectionIndex].getStake() > 0)) {
_.push(" <a href='#' onClick='return false' onmouseover=\"offsetx=0;offsety=0;return ");
_.push(data['eachwayHelp']);
_.push("();\" onmouseout='offsetx=130;offsety=220;return nd();' style='font-weight:normal; text-decoration:none;'><nobr>[");
_.push(data['translations']["MSG_EW_SLIP"]);
_.push("]</nobr></a> ");
}
_.push(" </span><span class='bfEventOdd'> ");
if ((data['hotComboAvailable'] && SlipConstants.ODD_STYLE_FRACTION == visitor.getEffectiveOddStyle())) {
_.push(" ");
_.push(to_odd(SlipConstants.ODD_STYLE_DECIMAL, data['selections'][selectionIndex].getOutcomeOdd()));
_.push(" ");
} else {
_.push(" ");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['selections'][selectionIndex].getOutcomeOdd(), data['selections'][selectionIndex].getOutcomeFractionOdd()));
_.push(" ");
}
_.push(" </span> </div> </td></tr> </table> </td> <td class='bfBetEventTd bfEventDarkGray bfRightFix' align='right'> <img src=' ");
if (( data['selections'][selectionIndex].isTeaserChecked() && data['teaserBetPlaced'] && !(data['selections'][selectionIndex].isSelectionChecked()))) {
_.push(" ");
_.push(data['urls']['tb']);
_.push("' title='");
_.push(data['translations']["TEASER_SELECTION_SLIP"]);
_.push("' > ");
} else {
if ((!(data['selections'][selectionIndex].isSelectionChecked()))) {
_.push(" ");
_.push(data['urls']['n']);
_.push("' height='1' width='1' > ");
}
}
_.push(" <img src=' ");
if (( (data['selections'][selectionIndex].isSelectionChecked() == false ) &&  data['selections'][selectionIndex].getStake() > 0 )) {
_.push(" ");
_.push(data['urls']['sb']);
_.push("' title='");
_.push(data['translations']["SINGLE_SLIP_22"]);
_.push("'><br/> ");
} else {
_.push(" ");
_.push(data['urls']['n']);
_.push("' height='1' width='1'><br/> ");
}
_.push(" <b> ");
if (( data['resultSelections'][selectionIndex].isFailed() == true)) {
_.push(" <span class='bfImportantStatusMessage'><b>");
_.push(data['translations']["MSG_FAILED"]);
_.push("</b></span> ");
} else {
if (( data['selections'][selectionIndex].getEventRef().getComboFactor() < 2)) {
if (( data['selections'][selectionIndex].getStake() == 0)) {
} else {
_.push(" ");
_.push(((typeof(data['currencySymbol']) == 'undefined') ? "" : data['currencySymbol']));
_.push(" ");
_.push(to_mn(data['selections'][selectionIndex].getStake(),2));
_.push(" ");
_.push(visitor.getCurrency());
_.push(" ");
}
} else {
_.push(" &nbsp;&nbsp;&nbsp;&nbsp ");
}
}
_.push(" </b> </td> </tr> ");
}
}
}
}
_.push(" </table> <div class='slipGradBtm'></div> </div> ");
return _.join("");
}
// template: slipConfirmButton
betslipTemplate.slipConfirmButton=function(data){
var _=[];
_.push(" <div id=\"confirmationButtonAnchor\"> <table align='right' cellpadding='0' cellspacing='0' class='btntable'> <tr> ");
if (data['freeBetMode'] != 1) {
_.push(" <td valign='top'><img width='8' src=\"");
_.push(data['urls']['btn_left_side']);
_.push("\"></td> <td colspan='2' class='bfSlipSubmitBtn' nowrap valign='top'> ");
} else {
_.push(" <td valign='top'><img width='8' src=\"");
_.push(data['urls']['freebet_btn_left_side']);
_.push("\"></td> <td colspan='2' class='bfSlipSubmitBtn bfSlipFreeSubmitBtn' nowrap valign='top'> ");
}
_.push(" <a href='#' onClick='");
_.push(data['goToConfirmation']);
_.push("(); ");
_.push(data['notifyUserActivity']);
_.push("(); return false;' title='");
_.push(data['translations']["PLACE_BET_SLIP_22"]);
_.push("'>");
_.push(data['translations']["PLACE_BET_SLIP_22"]);
_.push("</a> </td> ");
if (data['freeBetMode'] != 1) {
_.push(" <td valign='top'><img width='12' src=\"");
_.push(data['urls']['btn_right_side']);
_.push("\"></td> ");
} else {
_.push(" <td valign='top'><img width='12' src=\"");
_.push(data['urls']['freebet_btn_right_side']);
_.push("\"></td> ");
}
_.push(" </tr> </table> </div> ");
return _.join("");
}
// template: slipSubmitButton
betslipTemplate.slipSubmitButton=function(data){
var _=[];
_.push(" <div id=\"submitButtonAnchor\"> <table align='right' cellpadding='0' cellspacing='0' class='btntable' onclick='");
_.push(data['submit']);
_.push("()'> <tr> ");
if (data['freeBetMode'] != 1) {
_.push(" <td valign='top'><img width='8' src='");
_.push(data['urls']['btn_left_side']);
_.push("'></td> <td colspan='2' class='bfSlipSubmitBtn' nowrap valign='top'> ");
} else {
_.push(" <td valign='top'><img width='8' src='");
_.push(data['urls']['freebet_btn_left_side']);
_.push("'></td> <td colspan='2' class='bfSlipSubmitBtn bfSlipFreeSubmitBtn' nowrap valign='top'> ");
}
_.push(" <a href='#' onClick='return false' title='");
_.push(data['translations']["CONFIRM_SLIP_22"]);
_.push("'>");
_.push(data['translations']["CONFIRM_SLIP_22"]);
_.push("</a> </td> ");
if (data['freeBetMode'] != 1) {
_.push(" <td valign='top'><img width='12' src='");
_.push(data['urls']['btn_right_side']);
_.push("'></td> ");
} else {
_.push(" <td valign='top'><img width='12' src='");
_.push(data['urls']['freebet_btn_right_side']);
_.push("'></td> ");
}
_.push(" </tr> </table> </div> ");
return _.join("");
}
// template: slipReplyMessage
betslipTemplate.slipReplyMessage=function(data){
var _=[];
_.push(" <div id=\"replyMessageAnchor\"> <table border='0' cellpadding='0' cellspacing='0' class=' bfStandartTbl'> <tr> <td align='center' valign='middle' class='bfExpTd'> ");
if ((data['slipFailed'])) {
_.push(" <span class=\" ");
if ((data['allFailed'])) {
_.push(" bfImportantStatusMessage ");
} else {
_.push(" bfStatusMessage ");
}
_.push(" \" > ");
if ((data['showExplanation'])) {
_.push(" ");
_.push(data['translations']["MSG_SYSTEM_ERROR"].toUpperCase());
_.push(" ");
}
_.push(" </span> ");
} else {
_.push(" <span class='bfStatusMessage'>");
_.push(data['translations']["YOUR_BET_HAS_BEEN_PLACED_SLIP_22"]);
_.push("</span> <span class='bfSlipIdMessage'>");
_.push(data['slipId']);
_.push("</span> ");
}
_.push(" </td> </tr> ");
if ((data['slipFailed'])) {
_.push(" <tr> <td valign='middle' align=center> <span class='bfImportantStatusMessage'> ");
if ((data['needExplanation'])) {
_.push(" <b>");
_.push(data['translations']["MSG_EXPLANATION"]);
_.push("</b> ");
}
_.push(" ");
_.push(data['errorMessage']);
_.push(" </span> </td> </tr> ");
} else {
if ((data['hotComboAvailable'])) {
_.push(" <tr> <td align=center class='fbResetBtns'> <font size=-2> ");
_.push(data['translations']["HOT_COMBO_TO_NORMAL_COMBO"].replace("{0}", "<a href='#' onclick='" + data['convertHotComboToNormalCombo'] + "; return false;'><font size='-2'>" + data['translations']['HOT_COMBO_TO_NORMAL_COMBO_LINK'] + "</font></a>"));
_.push(" </font> </td> </tr> ");
}
_.push(" <tr> <td align=center class='fbResetBtns'> <font size=-2>");
_.push(data['translations']["HISTORY_SLIP_22"]);
_.push("</font>&nbsp; ");
if ((data['isInWebSite'])) {
_.push(" <a href='");
_.push(data['urls']['betsHistory']);
_.push("'> ");
} else {
_.push(" <a href='");
_.push(data['urls']['betsHistoryInClient']);
_.push("'> ");
}
_.push(" <font size=-2>");
_.push(data['translations']["HISTORY_SECURE"]);
_.push("</font></a> </td> </tr> ");
}
_.push(" <tr> <td align='center' valign='middle'> <div class='fbResetBtns'> <a href='#' onClick='");
_.push(data['returnToSlip']);
_.push("(); return false;'>");
_.push(data['translations']["RETURN_TO_SLIP_REPORT_22"]);
_.push("</a> | <a href='#' onClick='");
_.push(data['removeAllSelections']);
_.push("(); ");
_.push(data['notifyUserActivity']);
_.push("(); return false;'>");
_.push(data['translations']["CLEAR_SLIP_22"]);
_.push("</a> <div> </td> </tr> </table> <div id=\"replyMessageAnchor\"> ");
return _.join("");
}
// template: errorMessages
betslipTemplate.errorMessages=function(data){
var _=[];
_.push(" <div id='alertPanelAnchor' display=\"block\"> ");
if ((data['errorMessage'] == data['notLoggedIn'])) {
if ((data['liveMode'] == 1)) {
_.push(" <div id='popupLoginAlert' class=\"popupLoginAlertLive\"> ");
} else {
_.push(" <div id='popupLoginAlert'> ");
}
_.push(" <br/>");
_.push(data['translations']["SIGNIN_POPUP1"]);
_.push(" ");
if ((data['isInWebSite'] && visitor.isLoggedIn() && !visitor.isPlayMoneyPlayer() && (data['requestSkinId'] == "GB" || data['requestSkinId'] == "PB"))) {
_.push(" <br/><br/><a class=\"qd_btn\" href=\"javascript:;\" onClick=\"showQdDiv();\"><div class=\"qd_btn_shell\"><div class=\"qd_btn_right\">");
_.push(data['translations']["QUICK_DEPOSIT"]);
_.push("</div></div></a> ");
}
_.push(" <br/><br/>");
_.push(data['translations']["SIGNIN_POPUP2"]);
_.push(" <br/> ");
if ((data['isInWebSite'])) {
_.push(" <a href='#' onclick=\"register('");
_.push(data['translations']["REQUEST_BRAND_ID"]);
_.push("','");
_.push(data['translations']['WM_ID']);
_.push("','");
_.push(data['translations']["REQUEST_PA_LOCALE_ID"]);
_.push("'); return false;\"> ");
_.push(data['translations']["SIGNIN_POPUP3"]);
_.push("</a> ");
} else {
_.push(" <br/>");
_.push(data['translations']["SIGNIN_POPUP3"]);
_.push(" ");
}
_.push(" </div> ");
} else {
}
if (( data['errorMessage'] == data['notEnoughBalance'] )) {
_.push(" <div id='popupNotEnoughBalance' display=\"block\"> <br/>");
_.push(data['translations']['NOT_ENOUGH_BALANCE_MSG1']);
_.push(" ");
if ((data['isInWebSite'])) {
if ((visitor.isLoggedIn() && visitor.isPlayMoneyPlayer())) {
_.push(" <a href='#' onclick=\"cashier('");
_.push(data['requestSkinId']);
_.push("');\">");
_.push(data['translations']['NOT_ENOUGH_BALANCE_MSG2']);
_.push("</a> ");
} else {
_.push(" <a href='#' onclick=\"cashierRealMoneyPlayer('");
_.push(data['requestSkinId']);
_.push("');\">");
_.push(data['translations']['NOT_ENOUGH_BALANCE_MSG2']);
_.push("</a> ");
}
} else {
_.push(" <a href=\"");
_.push(data['urls']['cashier_deposit_real_in_client']);
_.push("\">");
_.push(data['translations']['NOT_ENOUGH_BALANCE_MSG2']);
_.push("</a> ");
}
_.push(" ");
_.push(data['translations']['NOT_ENOUGH_BALANCE_MSG3']);
_.push(" ");
if ((data['isInWebSite'] && visitor.isLoggedIn() && !visitor.isPlayMoneyPlayer() && (data['requestSkinId'] == "GB" || data['requestSkinId'] == "PB"))) {
_.push(" <br/><br /><a class=\"qd_btn_h\" href=\"javascript:;\" onClick=\"showQdDiv();\"><span class=\"qd_btn_shell_h\"><span class=\"qd_btn_right_h\">");
_.push(data['translations']["QUICK_DEPOSIT"]);
_.push("</span></span></a> ");
}
_.push(" </div> ");
}
_.push(" </div> ");
return _.join("");
}
// template: flashAlert
betslipTemplate.flashAlert=function(data){
var _=[];
_.push(" <div id=\"flashAlertPanelAnchor\"> <div id='popupFlashSupportAlert'> ");
if ((! data['isFlashAvailable'])) {
_.push(" <br/><br/> ");
_.push(data['translations']["INSTALL_FLASH_1"]);
_.push("<br/> <a href=\"");
_.push(data['translations']["ADOBE_SITE_INSTALL"]);
_.push("\" target=\"_blank\"><b>");
_.push(data['translations']["INSTALL_FLASH_2"]);
_.push("</b></a> ");
_.push(data['translations']["INSTALL_FLASH_3"]);
_.push("<br/> ");
if ((data['isInWebSite'])) {
_.push(" <a href=\"#\" onclick=\"window.open('");
_.push(data['urls']['flash_faq_popup']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\"><b>");
_.push(data['translations']["INSTALL_FLASH_4"]);
_.push("</b></a> ");
} else {
_.push(" <a href=\"#\" onclick=\"window.open('");
_.push(data['urls']['flash_faq_popup_in_client']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\"><b>");
_.push(data['translations']["INSTALL_FLASH_4"]);
_.push("</b></a> ");
}
_.push(" ");
_.push(data['translations']["INSTALL_FLASH_5"]);
_.push(" ");
} else {
if ((! data['isFlashVersionSupported'])) {
_.push(" <br/><br/> ");
_.push(data['translations']["UPGREAD_FLASH_1"]);
_.push("<br/><a href=\"");
_.push(data['translations']["ADOBE_SITE_INSTALL"]);
_.push("\" target=\"_blank\"><b> ");
_.push(data['translations']["UPGREAD_FLASH_2"]);
_.push("</b></a>&nbsp;");
_.push(data['translations']["UPGREAD_FLASH_3"]);
_.push("<br/> ");
if ((data['isInWebSite'])) {
_.push(" <a href=\"#\" onclick=\"window.open('");
_.push(data['urls']['flash_faq_popup']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\"><b>");
_.push(data['translations']["INSTALL_FLASH_4"]);
_.push("</b></a> ");
} else {
_.push(" <a href=\"#\" onclick=\"window.open('");
_.push(data['urls']['flash_faq_popup_in_client']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\"><b>");
_.push(data['translations']["INSTALL_FLASH_4"]);
_.push("</b></a> ");
}
_.push(" ");
_.push(data['translations']["UPGREAD_FLASH_5"]);
_.push(" ");
} else {
if ((! data['hasEnoughFlashCache'])) {
_.push(" ");
_.push(data['translations']['SLIP_FLASH_NO_CACHE_1']);
_.push(" <a href=\"#\" onclick=\"new FlashHelper(");
_.push(data['windowType']);
_.push(").showSlipFlashConfigurationAlerts()\">");
_.push(data['translations']['SLIP_FLASH_NO_CACHE_2']);
_.push("</a> ");
_.push(data['translations']['SLIP_FLASH_NO_CACHE_3']);
_.push(" ");
if ((data['isInWebSite'])) {
_.push(" <a href=\"#\" onclick=\"window.open('");
_.push(data['urls']['faq_popup']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\"> ");
} else {
_.push(" <a href=\"#\" onClick=\"window.open('");
_.push(data['urls']['faq_popup_in_client']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\"> ");
}
_.push(" ");
_.push(data['translations']['SLIP_FLASH_NO_CACHE_4']);
_.push("</a> ");
_.push(data['translations']["SLIP_FLASH_NO_CACHE_5"]);
_.push("&nbsp; <a href=\"");
_.push(['translations']['SLIP_FLASH_ADOBE_SITE']);
_.push("\" target=\"_blank\">");
_.push(data['translations']["SLIP_FLASH_NO_CACHE_6"]);
_.push("</a> ");
_.push(data['translations']['SLIP_FLASH_NO_CACHE_7']);
_.push(" ");
}
}
}
_.push(" </div> </div> ");
return _.join("");
}
// template: slipHeaderEmpty
betslipTemplate.slipHeaderEmpty=function(data){
var _=[];
_.push(" <div align='left' id=\"headerPanelAnchor\"> <table border='0' cellpadding='0' cellspacing='0' class='bfHeaderTbl bfStandartTbl ");
if (data['freeBetMode'] == 1) {
_.push(" bfFreeBetHeader ");
}
_.push(" '> ");
if ((data['liveMode'] == 1)) {
_.push(" <tr><td class='bfRedTDinitial'>");
_.push(data['translations']["LIVE_BET_SLIP"]);
_.push("</td> ");
} else {
_.push(" <tr><td class='bfRedTDinitial'>");
_.push(data['translations']["BET_SLIP"]);
_.push("</td> ");
}
_.push(" </tr> </table> </div> ");
return _.join("");
}
// template: liveProgressBarPanel
betslipTemplate.liveProgressBarPanel=function(data){
var _=[];
_.push(" <div id=\"liveProgressBarPanelAnchor\" align=\"center\"> <div id=\"lvbnLoader\"> <div id=\"lvbnLoading\"></div> </div> <div id=\"lvbnProcessing\">");
_.push(data['translations']["LIVE_SLIP_PROCESSING"]);
_.push("...</div> </div> ");
return _.join("");
}
// template: slipSelectionEmpty
betslipTemplate.slipSelectionEmpty=function(data){
var _=[];
_.push(" <div align='left' id=\"emptySelectionPanelAnchor\"> ");
if ((data['liveMode'] == 1)) {
_.push(" <table border='0' cellpadding='0' cellspacing='0' class='slipflottxtLive'> ");
} else {
_.push(" <table border='0' cellpadding='0' cellspacing='0' class='slipflottxt'> ");
}
_.push(" <tr><td valign='top'> ");
if ((data['liveMode'] == 1)) {
_.push(" ");
_.push(data['translations']["L_TO_PLACE_LIVE_BET"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["L_TO_PLACE_BET"]);
_.push(" ");
}
_.push(" </tr> </table> </div> ");
return _.join("");
}
// template: slipTotalEmpty
betslipTemplate.slipTotalEmpty=function(data){
var _=[];
_.push(" <div id=\"emptyTotalPanelAnchor\"> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr> <td align='right' valign='bottom'><div class='foldSlip ");
if ((data['freeBetMode'] == 1)) {
_.push(" foldFreeBetSlip ");
}
_.push(" '> <div class='sliptotalb'>");
_.push(data['translations']["BETS_SLIP_22"]);
_.push(": 0</div> </div></td> </tr> </table> </div> ");
return _.join("");
}
// template: slipTotalSelection
betslipTemplate.slipTotalSelection=function(data){
var _=[];
_.push(" <div id=\"selectionTotalPanelAnchor\"> ");
if ((data['showSlipGradBtm'])) {
_.push(" <div class='slipGradBtm'></div> ");
}
if ((data['liveMode'] == 1)) {
_.push(" <div id=\"liveSlipOddsOptions\"> <div id=\"liveSlipOddsOptionsHeader\" class=\"liveSlipOddsOptionsHeadercont\" onclick=\"");
_.push(data['collapseExpandOddsOptions']);
_.push("();\"> <div class=\"oddsOptionsHeaderImage ");
if ((!data['collapsedOddsOptionsBlock'])) {
_.push(" oddsOptionsHeaderImageExpanded ");
}
_.push(" \"></div> <span class=\"oddsOptionsHeadertxt\">");
_.push(data['translations']["LIVESLIP_ODDS_OPTIONS"]);
_.push("</span> </div> <div id=\"oddsOptions\" ");
if ((data['collapsedOddsOptionsBlock'])) {
_.push(" style=\"display:none;\" ");
}
_.push(" > <div id=\"lsAutoUpdateDiv\" class=\"oddsOptionsContenttxt\"> <div class=\"oddsOptionsContentInside\"><input type=checkbox onclick=\"");
_.push(data['switchLiveSlipOddsAutoUpdate']);
_.push("(this.checked);\" name='cbAutoOddsUpdate' ");
if ((visitor.getLiveSlipOddsAutoUpdate())) {
_.push(" checked title=\"");
_.push(data['translations']["LIVESLIP_TURN_OFF_ODDS_AUTO_UPDATE"]);
_.push("\" ");
} else {
_.push(" title=\"");
_.push(data['translations']["LIVESLIP_TURN_ON_ODDS_AUTO_UPDATE"]);
_.push("\" ");
}
_.push(" > ");
_.push(data['translations']["LIVE_SLIP_AUTO_ODDS_UPDATE"]);
_.push(" <a class='bnkrQmark' href=\"javascript:;\" title=\"");
_.push(data['translations']['LIVE_SLIP_AUTO_ODDS_UPDATE_FAQ_TITLE']);
_.push("\" onclick=\"window.open('");
_.push(data['urls']['live_odds_update_faq']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\">?</a></div> <div class=\"oddsOptionsContentInside\"><input type=checkbox onclick=\"");
_.push(data['updateLiveSlipAcceptOddsChanges']);
_.push("(this.type, this.checked);\" name='cbAcceptOddsChanges' ");
if ((visitor.getLiveSlipAcceptOddsChanges() > 0)) {
_.push(" checked title=\"");
_.push(data['translations']["LIVESLIP_TURN_OFF_ACCEPT_ODDS_CHANGES"]);
_.push("\" ");
} else {
_.push(" title=\"");
_.push(data['translations']["LIVESLIP_TURN_ON_ACCEPT_ODDS_CHANGES"]);
_.push("\" ");
}
_.push(" > ");
_.push(data['translations']["LIVE_SLIP_ACCEPT_ODDS_CHANGES"]);
_.push(" <a class='bnkrQmark' href=\"javascript:;\" title=\"");
_.push(data['translations']['LIVE_SLIP_ACCEPT_ODDS_CHANGES_FAQ_TITLE']);
_.push("\" onclick=\"window.open('");
_.push(data['urls']['live_accept_odds_changes_faq']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\">?</a></div> <div class=\"oddsOptionsContentInsideRadio\"><span><input type=\"radio\" onclick=\"");
_.push(data['updateLiveSlipAcceptOddsChanges']);
_.push("(this.type, this.checked, this.value);\" name='rbAcceptOddsChanges' ");
if ((visitor.getLiveSlipAcceptOddsChanges() == 2)) {
_.push(" checked ");
} else {
if ((visitor.getLiveSlipAcceptOddsChanges() == 0)) {
_.push(" disabled class=\"oddsOptionsContentInsideRadioBtn\" ");
}
}
_.push(" value=\"2\" > ");
_.push(data['translations']["LIVE_SLIP_ANY_ODDS_CHANGES"]);
_.push("</span></div> <div class=\"oddsOptionsContentInsideRadio\"><span><input type=\"radio\" onclick=\"");
_.push(data['updateLiveSlipAcceptOddsChanges']);
_.push("(this.type, this.checked, this.value);\" name='rbAcceptOddsChanges' ");
if ((visitor.getLiveSlipAcceptOddsChanges() == 1)) {
_.push(" checked ");
} else {
if ((visitor.getLiveSlipAcceptOddsChanges() == 0)) {
_.push(" disabled class=\"oddsOptionsContentInsideRadioBtn\" ");
}
}
_.push(" value=\"1\" > ");
_.push(data['translations']["LIVE_SLIP_ONLY_HIGHER_ODDS"]);
_.push("</span></div><br> </div> </div> </div> ");
}
_.push(" <div class=\"foldSlip ");
if ((data['freeBetMode'] == 1)) {
_.push(" foldFreeBetSlip ");
}
_.push(" \"> <table border='0' cellpadding='0' cellspacing='0' width='100%' > <tr class='bfNumSlip'> <td align='right'>");
_.push(data['translations']["BETS_SLIP_22"]);
_.push(": ");
_.push(data['numerBets']);
_.push("</td> </tr> <tr class='bfCostSlip'> <td align='right'>");
_.push(data['translations']["COST_SLIP_22"] + ((visitor.getCurrency()) ? " ("+visitor.getCurrency()+")" : "") + ": " + ((data['currencySymbol']) ? data['currencySymbol']: "") + to_mn(data['totalCost']));
_.push(" </td> </tr> ");
if ((data['configs']['TOTAL_BET_TAX_PERCENTAGE'] != null)) {
_.push(" <tr class='bfCostSlip'> <td align='right'><a href='#' onClick='return false;' onmouseover=\"offsetx=170;offsety=0;return ");
_.push(data['getBetTaxHelp']);
_.push("();\" onmouseout='return nd();'>");
_.push(data['translations']["PLACE_BET_TAX"] + ((visitor.getCurrency()) ? " ("+visitor.getCurrency()+")" : ""));
_.push("</a>: ");
_.push(((data['currencySymbol']) ? data['currencySymbol']: "") + to_mn(data['totalTax']));
_.push(" </td> </tr> ");
}
_.push(" <tr class='bfPayoutSlip'><td class='bfpoints' align='right'> <a href='#' onClick='return false;' onmouseover=\"offsetx=170;offsety=0;return ");
_.push(data['getLoyaltPointsHelp']);
_.push("();\" onmouseout='return nd();'> ");
_.push(data['translations']["LOYALTY_POINTS"]);
_.push("</a>: ");
_.push(data['possiblePoints']);
_.push("</td></tr> <tr class='bfPayoutSlip'> <td align='right'> ");
if ((data['configs']['REQUEST_BRAND_ID'] == 'PARTYDK')) {
_.push(" <a class=\"fee_link\" href=\"javascript:;\" onclick=\"showTaxDK(); return false\">* Fees may apply</a> ");
}
if ((data['isInWebSite'] && visitor.isLoggedIn() && !visitor.isPlayMoneyPlayer() && (data['requestSkinId'] == "GB" || data['requestSkinId'] == "PB"))) {
_.push(" <a class=\"qd_btn\" href=\"javascript:;\" onClick=\"showQdDiv();\"><div class=\"qd_btn_shell\"><div class=\"qd_btn_right\">");
_.push(data['translations']["QUICK_DEPOSIT"]);
_.push("</div></div></a> ");
}
_.push(" ");
_.push(data['translations']["WIN_SLIP_22"] + ((visitor.getCurrency()) ? " ("+visitor.getCurrency()+")" : "") + ": ");
_.push(" <br/><span class='payoutSum'> ");
_.push(((data['currencySymbol']) ? data['currencySymbol'] : "") + to_mn(data['totalPayout']));
_.push(" </span> </td> </tr> </table> </div> </div> ");
return _.join("");
}
// template: slipTotalConfirmation
betslipTemplate.slipTotalConfirmation=function(data){
var _=[];
_.push(" <div id=\"confirmationTotalPanelAnchor\"> ");
if ((data['showSlipGradBtm'])) {
_.push(" <div class='slipGradBtm'></div> ");
}
if ((data['isEDSVisible'])) {
_.push(" <div id=\"liveSlipOddsOptions\"> <div id=\"edsMessageHeader\" class=\"edsHeadercont\"> <span class=\"oddsOptionsHeadertxt\">");
_.push(data['translations']["LIVESLIP_ODDS_OPTIONS"]);
_.push("</span> </div> <div id=\"edsMessage\"> ");
_.push(data['translations']["LIVE_SLIP_ACCEPT_ODDS_CHANGES_MESSAGE"]);
_.push(" </div> <div id=\"edsButtons\"> <div class=\"edsButtonsmain\"> <div class=\"edsButtonscontent\"><a href='#' onclick=\"");
_.push(data['returnToSlipWithUpdatedOddOption']);
_.push("(); return false;\">");
_.push(data['translations']["LIVE_SLIP_ACCEPT_ODDS_CHANGES_OK"]);
_.push("</a></div> <div class=\"edsButtonscontentright\"><a href='#' onclick=\"");
_.push(data['hideEDSMessage']);
_.push("(); return false;\">");
_.push(data['translations']["LIVE_SLIP_ACCEPT_ODDS_CHANGES_CANCEL"]);
_.push("</a></div> </div> </div> ");
}
_.push(" <div class=\"foldSlip ");
if ((data['freeBetMode'] == 1)) {
_.push(" foldFreeBetSlip ");
}
_.push(" \"> <table border='0' cellpadding='0' cellspacing='0' width='100%' class='bfStandartTbl'> <tr class='bfNumSlip'> <td align='right'>");
_.push(data['translations']["BETS_SLIP_22"]);
_.push(": ");
_.push(data['numerBets']);
_.push("</td> </tr> <tr class='bfCostSlip'> <td align='right'>");
_.push(data['translations']["COST_SLIP_22"] + " " + ((visitor.getCurrency()) ? "("+visitor.getCurrency()+")" : "") + ": " + ((data['currencySymbol']) ? data['currencySymbol']: "") + to_mn(data['totalCost']));
_.push(" </td> </tr> ");
if ((data['configs']['TOTAL_BET_TAX_PERCENTAGE'] != null)) {
_.push(" <tr class='bfCostSlip'> <td align='right'><a href='#' onClick='return false;' onmouseover=\"offsetx=170;offsety=0;return ");
_.push(data['getBetTaxHelp']);
_.push("();\" onmouseout='return nd();'>");
_.push(data['translations']["PLACE_BET_TAX"] + ((visitor.getCurrency()) ? " ("+visitor.getCurrency()+")" : ""));
_.push("</a>: ");
_.push(((data['currencySymbol']) ? data['currencySymbol']: "") + to_mn(data['totalTax']));
_.push(" </td> </tr> ");
}
_.push(" <tr class='bfPayoutSlip'><td class='bfpoints' align='right'> <a href='#' onClick='t_bnks(); return false;'></a> <a href='#' onClick='return false;' onmouseover=\"offsetx=170;offsety=0;return ");
_.push(data['getLoyaltPointsHelp']);
_.push("();\" onmouseout='return nd();'> ");
_.push(data['translations']["LOYALTY_POINTS"]);
_.push("</a>: ");
_.push(data['possiblePoints']);
_.push("</td></tr> <tr class='bfPayoutSlip'> <td align='right'> ");
if ((data['configs']['REQUEST_BRAND_ID'] == 'PARTYDK')) {
_.push(" <a class=\"fee_link\" href=\"javascript:;\" onclick=\"showTaxDK(); return false\">");
_.push(data['translations']["FEE_MAY_APPLY"]);
_.push("</a> ");
}
if ((data['isInWebSite'] && visitor.isLoggedIn() && !visitor.isPlayMoneyPlayer() && (data['requestSkinId'] == "GB" || data['requestSkinId'] == "PB"))) {
_.push(" <a class=\"qd_btn\" href=\"javascript:;\" onClick=\"showQdDiv();\"><div class=\"qd_btn_shell\"><div class=\"qd_btn_right\">");
_.push(data['translations']["QUICK_DEPOSIT"]);
_.push("</div></div></a> ");
}
_.push(" ");
_.push(data['translations']["WIN_SLIP_22"] + ((visitor.getCurrency()) ? " ("+visitor.getCurrency()+")" : "") + ": ");
_.push(" <br/><span class='payoutSum'> ");
_.push(((data['currencySymbol']) ? data['currencySymbol'] : "") + to_mn(data['totalPayout']));
_.push(" </span> </td> </tr> </table> </div> </div> ");
return _.join("");
}
// template: teaser
betslipTemplate.teaser=function(data){
var _=[];
_.push(" <div class='teasersHolder' id='teaserPanelAnchor'> <table border='0' cellpadding='0' cellspacing='0' class='teasers_width'> <tr> <td class='bfDarkHeadStyleLeft'><b>");
_.push(data['translations']['TEASER_SLIP']);
_.push("</b></td> <td class='bfDarkHeadStyle' align='right'> <a href='#' onClick='");
_.push(data['removeTeaser']);
_.push("(); return false;' title='");
_.push(data['translations']['REMOVE_TEASER_SLIP']);
_.push("'>");
_.push(data['translations']['REMOVE_TEASER_SLIP']);
_.push("</a> ");
if ((data['isInWebSite'])) {
_.push(" <a href='#' onclick=\"loadUrlWithParameters('");
_.push(data['urls']['teasers_faq_url']);
_.push("', 'FAQ', 'resizable=yes,width=600,height=450,scrollbars=yes');return false;\">[?]</a> ");
} else {
_.push(" <a href='#' onclick=\"loadUrlWithParameters('");
_.push(data['urls']['teasers_faq_url_in_client']);
_.push("', 'FAQ', 'resizable=yes,width=600,height=450,scrollbars=yes');return false;\">[?]</a> ");
}
_.push(" </td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' class='teasers_width'> <tr> <td class='bfDarkHeadStyle' align='left'> <b>");
_.push(data['translations']['TS_NUM_TEAM_TEASER'].replace("{0}", data['teaserSelectionsCount']));
_.push("</b></td> </tr> </table> ");
if ((data['areTeaserSelectionsValid'])) {
_.push(" <table border='0' cellpadding='0' cellspacing='0' class='teasers_width'> <tr> <td class='bfBetEventTdLeft'> <table border='0' cellpadding='0' cellspacing='0' class='teasers_width'> <tr> <td colspan='2'><div class='teaserName'>");
_.push(data['sportNames'].join(" / "));
_.push("</div></td> </tr> ");
for(var oddIndex in data['filteredOdds']) {
_.push(" <tr> <td> <div class='teaserName'> <input type=\"radio\" name=\"teaserGroup\" id=\"teaserGroup\" value=\"");
_.push(data['filteredOdds'][oddIndex].groupId);
_.push("\" onClick=\"");
_.push(data['toggleTeaserGroup']);
_.push("(");
_.push(data['filteredOdds'][oddIndex].groupId);
_.push(");\" ");
if ((data['selectedTeaserGroupId'] == data['filteredOdds'][oddIndex].groupId)) {
_.push(" checked ");
}
_.push(" > ");
_.push(data['groupTeaserPoints'][data['filteredOdds'][oddIndex].groupId].join(" / ").replace(/([0-9.,]+)/g, "$1 " + data['translations']['TEASER_POINTS_SLIP']));
_.push(" <span class='bfEventOdd'>");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['filteredOdds'][oddIndex].odd, data['filteredOdds'][oddIndex].oddFracDisp));
_.push("</span> </div> </td> <td> ");
if ((data['selectedTeaserGroupId'] == data['filteredOdds'][oddIndex].groupId)) {
_.push(" <input type=\"text\" class='checkStyle' maxlength='8' name='");
_.push(data['stakeBoxRegister'].registerStakeBox('teaserStake'));
_.push("' id='teaserStake' size='3' value= ");
if ((data['hasStake'])) {
_.push(" '");
_.push(data['stake']);
_.push("' ");
} else {
_.push(" '' ");
}
_.push(" onkeyup='");
_.push(data['handleTeaserStake']);
_.push("(this.value);' onkeypress=\"");
_.push(data['stakeTabOrder']);
_.push("(");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push(", event)\" tabindex='");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push("' > ");
if ((data['isMaxStakeShown'])) {
_.push(" ");
_.push(data['maxStake']);
_.push(" ");
}
} else {
_.push(" &nbsp; ");
}
_.push(" </td> </tr> ");
}
_.push(" </table> </td> </tr> </table> ");
}
_.push(" <div class='slipGrad'> </div> </div> ");
return _.join("");
}
// template: teaserConfirmation
betslipTemplate.teaserConfirmation=function(data){
var _=[];
_.push(" <div class='teaserHolder' id='teaserConfirmationPanelAnchor'> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td class='bfDarkHeadStyle' align='left'><b>");
_.push(data['translations']['TS_NUM_TEAM_TEASER'].replace("{0}", data['teaserSelectionsCount']));
_.push("</b></td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td class='bfComboLeftConf' style='margin-left:0; padding:0'> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td colspan='2' class='bfBetEventTdd'>");
_.push(data['sportNames'].join(" / "));
_.push("</td> </tr> <tr> <td class='bfBetEventTdd'> ");
_.push(data['teaserPoints'].join(" / ").replace(/([0-9.,]+)/g, "$1 " + data['translations']['TEASER_POINTS_SLIP']));
_.push(" <span class='bfEventOdd'>");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['oddObject'].odd, data['oddObject'].oddFracDisp));
_.push("</span> </td> <td align='right' class='bfBetEventMdlConf' nowrap> ");
if ((data['isTeaserFailed'])) {
_.push(" <span class='bfImportantStatusMessage'><b>");
_.push(data['translations']["MSG_FAILED"]);
_.push("</b></span> ");
} else {
_.push(" <b>");
_.push(data['currencySymbol']);
_.push("");
_.push(data['stake']);
_.push(" ");
_.push(visitor.getCurrency());
_.push("</b> ");
}
_.push(" </td> </tr> </table> </td> </tr> </table> <div class='slipGradBtm'></div> </div> ");
return _.join("");
}
// template: slipCombo
betslipTemplate.slipCombo=function(data){
var _=[];
_.push(" <div id=\"comboPanelAnchor\"> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr> <td class='bfEventDarkGray'> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td class='bfComboSelect'> ");
if ((data['checkedSelectionsCount'] == 1)) {
_.push(" ");
_.push(data['checkedSelectionsCount']);
_.push(" ");
_.push(data['translations']["SELECTION_SLIP_22"]);
_.push("");
_.push(data['translations']["SELECTION_NON_PLURAL_SLIP22"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['checkedSelectionsCount']);
_.push(" ");
_.push(data['translations']["SELECTION_SLIP_22"]);
_.push("");
_.push(data['translations']["SELECTION_PLURAL_SLIP22"]);
_.push(" ");
}
_.push(" </td> <td align='right' class='bfMultTd'> ");
if ((data['showMaxStakeLink'] && data['freeBetMode'] != 1)) {
if ((data['isMaxStakeShown'])) {
_.push(" <a href='#' onClick='");
_.push(data['setMaxStakeShown']);
_.push("(false); return false;' title='");
_.push(data['translations']["HIDE_MAX_SLIP_22"]);
_.push("'>");
_.push(data['translations']["HIDE_MAX_SLIP_22"]);
_.push("</a> ");
} else {
_.push(" <a href='#' onClick='");
_.push(data['setMaxStakeShown']);
_.push("(true); return false;' title='");
_.push(data['translations']["SHOW_MAX_SLIP_22"]);
_.push("'>");
_.push(data['translations']["SHOW_MAX_SLIP_22"]);
_.push("</a> ");
}
}
if ((data['showTeaserLink'] && data['freeBetMode'] != 1)) {
if ((data['showMaxStakeLink'])) {
}
_.push(" <br><a href=\"#\" onClick='");
_.push(data['teasersLinkClicked']);
_.push("(true); return false;' title='");
_.push(data['translations']["ADD_TEASER_SLIP"]);
_.push("'>");
_.push(data['translations']["ADD_TEASER_SLIP"]);
_.push("</a><a href=\"#\" onclick=\"loadUrlWithParameters('");
_.push(data['urls']['teasers_faq_url']);
_.push("', 'FAQ', 'resizable=yes,width=600,height=450,scrollbars=yes');return false;\">[?]</a> ");
}
_.push(" </td> </tr> </table> </td> </tr> ");
if ((data['showErrorMsg'] == true)) {
_.push(" <tr><td><table class='bfStandartTbl' id='bfCombosContainer' border='0' cellpadding='0' cellspacing='0' > <tr><td id='bfErr' align='center'> ");
_.push(data['errorMsg']);
_.push(" </td></tr> </table></td></tr> ");
} else {
if ((data['comboTypes'].length > 0)) {
_.push(" <tr><td class='bfEventDarkGray'><table width='100%' border='0' cellpadding='0' cellspacing='0'> ");
if ((data['isBankersLinkClicked'])) {
_.push(" <tr> <td class='bfMultTd' align='left' > ");
if ((data['checkedBankersCount'] == 1)) {
_.push(" ");
_.push(data['checkedBankersCount']);
_.push(" ");
_.push(data['translations']["BANKER_SLIP_22"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['checkedBankersCount']);
_.push(" ");
_.push(data['translations']["BANKER_SLIP_22"]);
_.push("");
_.push(data['translations']["BANKER_PLURAL_SLIP_22"]);
_.push(" ");
}
_.push(" </td> <td align='right' class='bfMultTd' nowrap colspan='2'> <a href=\"#\" onclick=\"");
_.push(data['bankersLinkClicked']);
_.push("(false); return false;\">");
_.push(data['translations']["WITHOUT_BANKERS_SLIP_22"]);
_.push(" <a class='bnkrQmark' href='#' onClick='return false;' onmouseover='offsetx=170;offsety=0;return ");
_.push(data['showBankersHelpBlock']);
_.push("();' onmouseout='return nd();'>?</a></a> </td> </tr> <tr> <td class='bfMultTd' nowrap='true' colspan='2' align='left' >");
_.push(data['translations']["COMBO_ODD_SLIP_PL"]);
_.push(" <span class='comboNum'> ");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['comboOdd'], data['comboFractionOdd'], data['comboOdd']));
_.push(" </span> </td> </tr> ");
} else {
_.push(" <tr> <td class='bfComboSelect' valign='middle' nowrap>");
_.push(data['translations']["COMBO_ODD_SLIP_PL"]);
_.push(" <span class='comboNum' id='slipComboOdd'>");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['comboOdd'], data['comboFractionOdd'], data['comboOdd']));
_.push("</span> ");
if ((data['liveMode'] == 1)) {
if ((data['liveOddsShowArrowUp'])) {
_.push(" <img src=\"");
_.push(data['urls']['live_odd_arrow_up']());
_.push("\"> ");
}
if ((data['liveOddsShowArrowDown'])) {
_.push(" <img src=\"");
_.push(data['urls']['live_odd_arrow_down']());
_.push("\"> ");
}
}
_.push(" </td> <td align='right' class='bfMultTd' nowrap colspan='2'> ");
if ((data['showBankersLink'] && data['freeBetMode'] != 1)) {
_.push(" <a href='#' onclick=\"");
_.push(data['bankersLinkClicked']);
_.push("(true); return false;\">");
_.push(data['translations']["WITH_BANKERS_SLIP_22"]);
_.push(" <a class='bnkrQmark' href='#' onClick='return false;' onmouseover='offsetx=170;offsety=0;return ");
_.push(data['showBankersHelpBlock']);
_.push("();' onmouseout='return nd();'>?</a></a> ");
}
_.push(" </td> </tr> <tr><td colspan='3'></td></tr> ");
}
_.push(" <tr> <td align='right' class='bfDarkHeadStyle' width='65.5%'>&nbsp; &nbsp;</td> <td align='right' class='bfDarkHeadStyle'> ");
if (( data['freeBetMode'] == 1 )) {
_.push(" ");
_.push(data['translations']["FREEBET_SLIP_LABEL"]);
_.push(" ");
} else if ((visitor.isLoggedIn())) {
_.push(" ");
_.push(data['translations']["STAKE_SLIP_22"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["STAKES2_SLIP_22"]);
_.push(" ");
}
_.push(" </td> ");
if ((data['isMaxStakeShown'])) {
_.push(" <td align='right' class='bfDarkHeadStyle'> ");
_.push(data['translations']["MAX_SLIP_22"]);
_.push(" </td> ");
}
_.push(" </tr> </table> <table id='comboCombinationTable' border='0' cellpadding='0' cellspacing='0' width='100%'> ");
for(var comboIndex = 0; comboIndex < data['comboTypes'].length; comboIndex++) {
if ((typeof(data['comboTypes'][comboIndex]) != "undefined" && (data['freeBetMode'] != 1 || comboIndex == 0))) {
_.push(" <tr id='comboRow\"");
_.push(comboIndex);
_.push("\"'> <td class='bfComboLeft' valign='middle'> <span class='bfComboType'> ");
if ((comboIndex > 0)) {
_.push(" ");
_.push(data['translations']["ALL_SLIP_22"]);
_.push(" ");
}
_.push(" ");
_.push(data['translations']["COMBO_TYPE_TEXTS"][comboIndex]+((data['comboTypes'][comboIndex].getNumBets() > 1) ? data['translations']["COMBOS_PLURAL_SUFFIX_SLIP_22"] : ""));
_.push(" </span> = ");
_.push(data['comboTypes'][comboIndex].getNumBets());
_.push(" ");
_.push(data['translations']["BET_SLIP_22"]+((data['comboTypes'][comboIndex].getNumBets() > 1) ? data['translations']["BETS_PLURAL_SUFFIX_SLIP_22"] : ""));
_.push(" @ ");
if ((data['isEachWayComboAvailable'] && data['freeBetMode'] != 1)) {
if ((data['comboTypes'][comboIndex].isEachWayChecked())) {
_.push(" <td class='bfComboLeft' align='right'><input name='eachway_");
_.push(comboIndex);
_.push("' onclick=\"javascript:");
_.push(data['editEachWayChecked']);
_.push("(");
_.push(comboIndex);
_.push(")\" type='checkbox' checked></td> ");
} else {
_.push(" <td class='bfComboLeft' align='right'><input name='eachway_");
_.push(comboIndex);
_.push("' onclick=\"javascript:");
_.push(data['editEachWayChecked']);
_.push("(");
_.push(comboIndex);
_.push(")\" type='checkbox'></td> ");
}
}
_.push(" </td> <td class='bfComboMdl' valign='middle' align='right'> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <input class='checkStyle' maxlength='8' onKeyUp='");
_.push(data['editStake']);
_.push("(");
_.push(comboIndex);
_.push(", this.value)' name='");
_.push(data['stakeBoxRegister'].registerStakeBox('st' + comboIndex));
_.push("' size='3' onkeypress=\"");
_.push(data['stakeTabOrder']);
_.push("(");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push(", event)\" tabindex=\"");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push("\" ");
if (data['comboTypes'][comboIndex].hasStake()) {
_.push(" value='");
_.push(data['comboTypes'][comboIndex].getStake());
_.push("' ");
}
_.push(" > ");
} else {
if (data['comboTypes'][comboIndex].hasStake() && data['comboTypes'][comboIndex].getStake() != null) {
_.push(" <strong>");
_.push(to_mn(data['comboTypes'][comboIndex].getStake()) + (visitor.getCurrency() ? " " + visitor.getCurrency() : ""));
_.push("</strong> ");
}
_.push(" <input type=\"radio\" value=\"");
_.push(visitor.getFreeBetAmount());
_.push("\" name=\"freeBetSelection\" onclick='");
_.push(data['editStake']);
_.push("(");
_.push(comboIndex);
_.push(", this.value)' ");
if (data['comboTypes'][comboIndex].hasStake() && data['comboTypes'][comboIndex].getStake() != null) {
_.push(" checked ");
}
_.push(" /> ");
}
_.push(" </td> ");
if ((data['isMaxStakeShown'])) {
_.push(" <td class='bfBetEventTd bfEventDarkGray bfXcastExplanation' valign='top' align='right'>");
_.push(data['comboTypes'][comboIndex].getMaxStake());
_.push("</td> ");
}
_.push(" </tr> ");
}
}
}
_.push(" </table> </td></tr> ");
}
_.push(" </table> </div> ");
return _.join("");
}
// template: comboConfirmation
betslipTemplate.comboConfirmation=function(data){
var _=[];
_.push(" <div id=\"comboConfirmationPanelAnchor\"> ");
if ((data['isComboChecked'] && !data['confComboSelections'])) {
if ((data['liveMode'] == 1)) {
_.push(" <table class='bfStandartTbl' id='bfCombosContainer' border='0' cellpadding='0' cellspacing='0' > ");
} else {
_.push(" <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
}
_.push(" <tr> <td colspan='2' class='bfComboLeftConf'>");
_.push(data['translations']["COMBO_ODD_SLIP_PL"]);
_.push(" <span class='comboNum'>");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['comboOdd'], data['comboFractionOdd'], data['comboOdd']));
_.push("</span> </td> </tr> ");
if ((data['liveMode'] == 1)) {
_.push(" </table> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
}
for(var comboIndex in data['comboTypes']) {
if ((typeof(data['comboTypes'][comboIndex]) != "undefined")) {
if ((data['comboTypes'][comboIndex].getStake() > 0)) {
_.push(" <tr> <td class='bfComboLeftConf'> ");
if ((data['comboTypes'][comboIndex].getNumBets()> 1)) {
_.push(" ");
_.push(data['comboTypes'][comboIndex].getNumBets());
_.push(" ");
}
_.push(" ");
_.push(data['translations']["COMBO_TYPE_TEXTS"][comboIndex]+((data['comboTypes'][comboIndex].getNumBets() > 1) ? data['translations']["COMBOS_PLURAL_SUFFIX_SLIP_22"] : ""));
_.push(" @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['comboTypes'][comboIndex].getStake()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['comboTypes'][comboIndex].getStake()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class='bfComboMdlConf' align='right' nowrap> ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['comboTypes'][comboIndex].getStake() * data['comboTypes'][comboIndex].getNumBets()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['comboTypes'][comboIndex].getStake() * data['comboTypes'][comboIndex].getNumBets()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> </tr> ");
}
}
}
_.push(" </table> ");
}
_.push(" </div> ");
return _.join("");
}
// template: comboReport
betslipTemplate.comboReport=function(data){
var _=[];
_.push(" <div id=\"comboReportPanelAnchor\"> ");
if ((data['isComboChecked'] && !data['confComboSelections'])) {
if ((data['liveMode'] == 1)) {
_.push(" <table class='bfStandartTbl' id='bfCombosContainer' border='0' cellpadding='0' cellspacing='0' > ");
} else {
_.push(" <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
}
_.push(" <tr> <td colspan='2' class='bfComboLeftConf'>");
_.push(data['translations']["COMBO_ODD_SLIP_PL"]);
_.push(" <span class='comboNum'>");
_.push(to_odd(visitor.getEffectiveOddStyle(), data['comboOdd'], data['comboFractionOdd'], data['comboOdd']));
_.push("</span> </td> </tr> ");
if ((data['liveMode'] == 1)) {
_.push(" </table> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
}
for(var comboIndex in data['comboTypes']) {
if ((typeof(data['comboTypes'][comboIndex]) != "undefined")) {
if ((data['comboTypes'][comboIndex].getStake() > 0)) {
_.push(" <tr> <td class='bfComboLeftConf'> ");
if ((data['comboTypes'][comboIndex].getNumBets()> 1)) {
_.push(" ");
_.push(data['comboTypes'][comboIndex].getNumBets());
_.push(" ");
}
_.push(" ");
_.push(data['translations']["COMBO_TYPE_TEXTS"][comboIndex]+((data['comboTypes'][comboIndex].getNumBets() > 1) ? data['translations']["COMBOS_PLURAL_SUFFIX_SLIP_22"] : ""));
_.push(" @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['comboTypes'][comboIndex].getStake()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['comboTypes'][comboIndex].getStake()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class='bfComboMdlConf' align='right' nowrap> ");
if ((data['comboResults'][comboIndex].isFailed())) {
_.push(" <span class='bfImportantStatusMessage'><b>");
_.push(data['translations']["MSG_FAILED"]);
_.push("</b></span> ");
} else {
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['comboTypes'][comboIndex].getStake() * data['comboTypes'][comboIndex].getNumBets()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['comboTypes'][comboIndex].getStake() * data['comboTypes'][comboIndex].getNumBets()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" ");
}
_.push(" </td> </tr> ");
}
}
}
_.push(" </table> ");
}
_.push(" </div> ");
return _.join("");
}
// template: hotCombo
betslipTemplate.hotCombo=function(data){
var _=[];
_.push(" <div id=\"hotComboPanelAnchor\"> <span id='visibilityAnchor'></span> <table width='100%' border='0' cellpadding='0' cellspacing='0'> ");
if ((data['isMaxStakeLinkShown'] && data['freeBetMode'] != 1)) {
_.push(" <tr> <td class='bfEventDarkGray'> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td align='right' class='bfMultTd'> ");
if ((data['isMaxStakeShown'])) {
_.push(" <a href='#' onClick='");
_.push(data['setMaxStakeShown']);
_.push("(false); return false;' title='");
_.push(data['translations']['HIDE_MAX_SLIP_22']);
_.push("'>");
_.push(data['translations']['HIDE_MAX_SLIP_22']);
_.push("</a> ");
} else {
_.push(" <a href='#' onClick='");
_.push(data['setMaxStakeShown']);
_.push("(true); return false;' title='");
_.push(data['translations']['SHOW_MAX_SLIP_22']);
_.push("'>");
_.push(data['translations']['SHOW_MAX_SLIP_22']);
_.push("</a> ");
}
_.push(" </td> </tr> </table> </td> </tr> ");
}
_.push(" <tr> <td class='bfEventDarkGray'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr> <td class='bfDarkHeadStyle' valign='middle' align='left'> ");
_.push(data['translations']['HOT_COMBO_ODD_SLIP']);
_.push(" <span class='comboNum'>");
_.push(data['hotComboOdd']);
_.push("</span> </td> <td align='right' class='bfDarkHeadStyle' nowrap> ");
if ((visitor.isLoggedIn())) {
_.push(" ");
_.push(data['translations']['STAKE_SLIP_22']);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']['STAKES2_SLIP_22']);
_.push(" ");
}
_.push(" </td> ");
if ((data['isMaxStakeShown'])) {
_.push(" <td align='right' class='bfDarkHeadStyle' nowrap> ");
_.push(data['translations']['MAX_SLIP_22']);
_.push(" </td> ");
}
_.push(" </tr> <tr> <td class=\"bfComboLeftConf\" valign=\"middle\"> <span class=\"bfComboType\">");
_.push(data['translations']['HOT_COMBO_SLIP']);
_.push("</span> = 1 ");
_.push(data['translations']['BET_SLIP_22']);
_.push(" @ </td> <td class=\"bfComboMdlConf\" align=\"right\" nowrap> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <input type=\"text\" class=\"checkStyle\" maxlength=\"8\" size=\"3\" name=\"");
_.push(data['stakeBoxRegister'].registerStakeBox('hotComboStake'));
_.push("\" onKeyUp=\"");
_.push(data['editStake']);
_.push("(this.value)\" onkeypress=\"");
_.push(data['stakeTabOrder']);
_.push("(");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push(", event)\" tabindex=\"");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push("\" ");
if (data['hotComboData'].hasStake()) {
_.push(" value='");
_.push(data['hotComboData'].getHotComboStake());
_.push("' ");
}
_.push(" > ");
} else {
if (( data['hotComboData'].getHotComboStake() != "" && data['hotComboData'].getHotComboStake() != null )) {
_.push(" <strong>");
_.push(to_mn(data['hotComboData'].getHotComboStake()) + (visitor.getCurrency() ? " " + visitor.getCurrency() : ""));
_.push("</strong> ");
}
_.push(" <input type=\"radio\" value=\"");
_.push(visitor.getFreeBetAmount());
_.push("\" name=\"");
_.push(data['stakeBoxRegister'].registerStakeBox('hotComboStake'));
_.push("\" onKeyUp=\"");
_.push(data['editStake']);
_.push("(this.value)\" onkeypress=\"");
_.push(data['stakeTabOrder']);
_.push("(");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push(", event)\" ");
if (( data['hotComboData'].getHotComboStake() != "" && data['hotComboData'].getHotComboStake() != null )) {
_.push(" checked=\"checked\" ");
}
_.push(" /> ");
}
_.push(" </td> ");
if ((data['isMaxStakeShown'])) {
_.push(" <td class=\"bfBetEventTd bfEventDarkGray bfXcastExplanation\" valign=\"top\" align=\"right\"> ");
_.push(data['hotComboMaxStake']);
_.push(" </td> ");
}
_.push(" </tr> </table> </td> </tr> </table> </div> ");
return _.join("");
}
// template: hotComboConfirmation
betslipTemplate.hotComboConfirmation=function(data){
var _=[];
_.push(" <div id=\"hotComboConfirmationPanelAnchor\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"bfWhiteLineBot\" width=\"100%\"> <tr> <td colspan=\"2\" class=\"bfComboLeftConf\"> ");
_.push(data['translations']['HOT_COMBO_ODD_SLIP']);
_.push(" <span class=\"comboNum\">");
_.push(data['hotComboOdd']);
_.push("</span> </td> </tr> <tr> <td class=\"bfComboLeftConf\"> <span class=\"bfComboType\">");
_.push(data['translations']['HOT_COMBO_SLIP']);
_.push("</span> @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['stake']));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['stake']));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class=\"bfComboMdlConf\" align=\"right\" nowrap> ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['stake']));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['stake']));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> </tr> </table> </div> ");
return _.join("");
}
// template: hotComboReport
betslipTemplate.hotComboReport=function(data){
var _=[];
_.push(" <div id=\"hotComboReportPanelAnchor\"> <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"bfWhiteLineBot\" width=\"100%\"> <tr> <td colspan=\"2\" class=\"bfComboLeftConf\"> ");
_.push(data['translations']['HOT_COMBO_ODD_SLIP']);
_.push(" <span class=\"comboNum\">");
_.push(data['hotComboOdd']);
_.push("</span> </td> </tr> <tr> <td class=\"bfComboLeftConf\"> <span class=\"bfComboType\">");
_.push(data['translations']['HOT_COMBO_SLIP']);
_.push("</span> @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['stake']));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['stake']));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class=\"bfComboMdlConf\" align=\"right\" nowrap> ");
if ((data['hotComboFailed'])) {
_.push(" <span class='bfImportantStatusMessage'><b>");
_.push(data['translations']["MSG_FAILED"]);
_.push("</b></span> ");
} else {
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['stake']));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['stake']));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" ");
}
_.push(" </td> </tr> </table> </div> ");
return _.join("");
}
// template: slipTrixie
betslipTemplate.slipTrixie=function(data){
var _=[];
_.push(" <div id='trixiePanelAnchor' class=\"bfEventDarkGray\"> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <table border='0' cellpadding='0' cellspacing='0' width='100%'> ");
for(var comboIndex in data['trixieCombos']) {
_.push(" <tr id='comboRow");
_.push(data['trixieCombos'][comboIndex].getComboId());
_.push("'> <td class='bfComboLeft' style=\"background:#E1E1E1 none repeat scroll 0 0;\" valign='middle'> <span class='bfComboType'> ");
if ((data['multiWayPossible'])) {
_.push(" ");
_.push(data['translations']["ALL_SLIP_22"]);
_.push(" ");
_.push(data['translations']["TRIXIE_TYPE_TEXTS_PLURAL"][data['currentSystem']][data['trixieCombos'][comboIndex].getComboId()]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["TRIXIE_TYPE_TEXTS"][data['currentSystem']][data['trixieCombos'][comboIndex].getComboId()]);
_.push(" ");
}
_.push(" </span> <a class='bnkrQmark' href='#' onClick='return false;' onmouseover='offsetx=170;offsety=0;return ");
_.push(data['showPredefinedSystemsHelpBlock']);
_.push("(");
_.push(data['trixieCombos'][comboIndex].getComboId());
_.push(");' onmouseout='return nd();'>?</a> = ");
_.push(data['trixieCombos'][comboIndex].getNumBets());
_.push(" ");
_.push(data['translations']["BET_SLIP_22"]+((data['trixieCombos'][comboIndex].getNumBets() > 1) ? data['translations']["BETS_PLURAL_SUFFIX_SLIP_22"] : ""));
_.push(" @ <td class='bfComboMd2' valign='middle' align='right'><input type=\"text\" class='checkStyle' maxlength='8' name='");
_.push(data['stakeBoxRegister'].registerStakeBox('predefined_combo_' + data['trixieCombos'][comboIndex].getComboId()));
_.push("' onKeyUp='");
_.push(data['editStake']);
_.push("(");
_.push(comboIndex);
_.push(", this.value)' onKeyPress='");
_.push(data['stakeTabOrder']);
_.push("(");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push(", event)' tabindex='");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push("' size='3' ");
if (data['trixieCombos'][comboIndex].hasStake()) {
_.push(" value='");
_.push(data['trixieCombos'][comboIndex].getStake());
_.push("' ");
}
_.push(" ></td> ");
if ((data['isMaxStakeShown'])) {
_.push(" <td class='bfBetEventTd bfEventDarkGray bfXcastExplanation' valign='top' align='right' >");
_.push(data['trixieCombos'][comboIndex].getMaxStake());
_.push("</td> ");
}
_.push(" </tr> ");
}
_.push(" </table> ");
}
_.push(" </div> ");
return _.join("");
}
// template: slipTrixieConfirmation
betslipTemplate.slipTrixieConfirmation=function(data){
var _=[];
_.push(" <div id='trixieConfirmationPanelAnchor'> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
for(var comboIndex in data['trixieCombos']) {
if ((data['trixieCombos'][comboIndex].getStake() > 0)) {
_.push(" <tr> <td class='bfComboLeftConf'> ");
if ((data['trixieCombos'][comboIndex].getNumSystemBets() > 1)) {
_.push(" ");
_.push(data['trixieCombos'][comboIndex].getNumSystemBets());
_.push(" ");
_.push(data['translations']["TRIXIE_TYPE_TEXTS_PLURAL"][data['currentSystem']][data['trixieCombos'][comboIndex].getComboId()]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["TRIXIE_TYPE_TEXTS"][data['currentSystem']][data['trixieCombos'][comboIndex].getComboId()]);
_.push(" ");
}
_.push(" @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['trixieCombos'][comboIndex].getStake()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['trixieCombos'][comboIndex].getStake()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class='bfComboMdlConf' align='right' nowrap> ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['trixieCombos'][comboIndex].getStake()*data['trixieCombos'][comboIndex].getNumBets()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['trixieCombos'][comboIndex].getStake()*data['trixieCombos'][comboIndex].getNumBets()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> </tr> ");
}
}
_.push(" </table> </div> ");
return _.join("");
}
// template: slipTrixieReport
betslipTemplate.slipTrixieReport=function(data){
var _=[];
_.push(" <div id='trixieReportAnchor'> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
for(var comboIndex in data['trixieCombos']) {
if ((data['trixieCombos'][comboIndex].getStake() > 0)) {
_.push(" <tr> <td class='bfComboLeftConf'> ");
if ((data['trixieCombos'][comboIndex].getNumSystemBets() > 1)) {
_.push(" ");
_.push(data['trixieCombos'][comboIndex].getNumSystemBets());
_.push(" ");
_.push(data['translations']["TRIXIE_TYPE_TEXTS_PLURAL"][data['currentSystem']][data['trixieCombos'][comboIndex].getComboId()]);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']["TRIXIE_TYPE_TEXTS"][data['currentSystem']][data['trixieCombos'][comboIndex].getComboId()]);
_.push(" ");
}
_.push(" @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['trixieCombos'][comboIndex].getStake()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['trixieCombos'][comboIndex].getStake()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class='bfComboMdlConf' align='right' nowrap> ");
if ((data['trixieResults'][comboIndex].isFailed())) {
_.push(" <span class='bfImportantStatusMessage'><b>");
_.push(data['translations']["MSG_FAILED"]);
_.push("</b></span> ");
} else {
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['trixieCombos'][comboIndex].getStake()*data['trixieCombos'][comboIndex].getNumBets()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['trixieCombos'][comboIndex].getStake()*data['trixieCombos'][comboIndex].getNumBets()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" ");
}
_.push(" </td> </tr> ");
}
}
_.push(" </table> </div> ");
return _.join("");
}
// template: multiWay
betslipTemplate.multiWay=function(data){
var _=[];
_.push(" <div id=\"multiWayPanelAnchor\"> <span id='visibilityAnchor'></span> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr> <td class='bfEventDarkGray'> <table border='0' cellpadding='0' cellspacing='0' width='100%'> <tr> <td class='bfComboSelect'> ");
if ((data['checkedSelectionsCount'] == 1)) {
_.push(" ");
_.push(data['checkedSelectionsCount']);
_.push(" ");
_.push(data['translations']["SELECTION_SLIP_22"]);
_.push("");
_.push(data['translations']["SELECTION_NON_PLURAL_SLIP22"]);
_.push(" ");
} else {
_.push(" ");
_.push(data['checkedSelectionsCount']);
_.push(" ");
_.push(data['translations']["SELECTION_SLIP_22"]);
_.push("");
_.push(data['translations']["SELECTION_PLURAL_SLIP22"]);
_.push(" ");
}
_.push(" </td> <td align='right' class='bfMultTd'> ");
if ((data['maxStakeLinkShown'] && data['freeBetMode'] != 1)) {
if ((data['isMaxStakeShown'])) {
_.push(" <a href='#' onClick='");
_.push(data['setMaxStakeShown']);
_.push("(false); return false;' title='");
_.push(data['translations']['HIDE_MAX_SLIP_22']);
_.push("'>");
_.push(data['translations']['HIDE_MAX_SLIP_22']);
_.push("</a> ");
} else {
_.push(" <a href='#' onClick='");
_.push(data['setMaxStakeShown']);
_.push("(true); return false;' title='");
_.push(data['translations']['SHOW_MAX_SLIP_22']);
_.push("'>");
_.push(data['translations']['SHOW_MAX_SLIP_22']);
_.push("</a> ");
}
_.push(" <br> ");
}
if ((data['teasersLinkShown'] && data['freeBetMode'] != 1)) {
_.push(" <a href='#' onClick='");
_.push(data['setAddTeaserClicked']);
_.push("(true); return false;' title='");
_.push(data['translations']["ADD_TEASER_SLIP"]);
_.push("'>");
_.push(data['translations']["ADD_TEASER_SLIP"]);
_.push("</a> <a href=\"#\" onclick=\"loadUrlWithParameters('");
_.push(data['urls']['teasers_faq_url']);
_.push("', 'FAQ', 'resizable=yes,width=600,height=450,scrollbars=yes');return false;\">[?]</a> ");
}
_.push(" </td> </tr> <tr> <td colspan=\"2\" id=\"bfErr\" align=\"left\"> ");
_.push(data['conflictMessage']);
_.push(" ");
if ((data['freeBetMode'] != 1)) {
_.push(" <br/><br/> <font color=\"green\">");
_.push(data['translations']['PLACE_MULTI_WAY']);
_.push("</font> ");
}
_.push(" </td> </tr> </table> </td> </tr> ");
if ((data['freeBetMode'] != 1)) {
_.push(" <tr> <td class='bfEventDarkGray'> <table width='100%' border='0' cellpadding='0' cellspacing='0'> <tr> <td class='bfDarkHeadStylenew' valign='middle' nowrap align=\"left\"> <b>");
_.push(data['translations']['MULTI_WAY_SYSTEMS']);
_.push("</b> <a class='bnkrQmark' href=\"#\" onclick=\"window.open('");
_.push(data['urls']['multi_way_faq_url']);
_.push("','");
_.push(data['urls']['faq_']);
_.push("','resizable=yes,width=600,height=450,scrollbars=yes'); return false;\">?</a> </td> <td align='right' class='bfDarkHeadStyle' nowrap> ");
if ((visitor.isLoggedIn())) {
_.push(" ");
_.push(data['translations']['STAKE_SLIP_22']);
_.push(" ");
} else {
_.push(" ");
_.push(data['translations']['STAKES2_SLIP_22']);
_.push(" ");
}
_.push(" </td> ");
if ((data['isMaxStakeShown'])) {
_.push(" <td align='right' class='bfDarkHeadStyle' nowrap> ");
_.push(data['translations']['MAX_SLIP_22']);
_.push(" </td> ");
}
_.push(" </tr> ");
for(var multiWayCombinationIndex in data['multiWayCombinations']) {
_.push(" <tr> <td class=\"bfComboLeft\" valign=\"middle\"> <span class=\"bfComboType\">");
_.push(data['translations']["ALL_SLIP_22"] + data['multiWayCombinations'][multiWayCombinationIndex].getCombinationName());
_.push("</span> = ");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getNumberOfBets());
_.push(" ");
_.push(data['translations']['BET_SLIP_22'] + ((data['multiWayCombinations'][multiWayCombinationIndex].getNumberOfBets() > 1) ? data['translations']["BETS_PLURAL_SUFFIX_SLIP_22"] : ""));
_.push(" @ </td> <td class=\"bfComboMdlConf\" align=\"right\" nowrap> <input type=\"text\" class=\"checkStyle\" maxlength=\"8\" size=\"3\" name=\"");
_.push(data['stakeBoxRegister'].registerStakeBox('multiWayStake' + multiWayCombinationIndex));
_.push("\" onKeyUp=\"");
_.push(data['editStake']);
_.push("(this.value, ");
_.push(multiWayCombinationIndex);
_.push(")\" onkeypress=\"");
_.push(data['stakeTabOrder']);
_.push("(");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push(", event)\" tabindex=\"");
_.push(data['stakeBoxRegister'].getMaxStakeBoxTabIndex());
_.push("\" ");
if (data['multiWayCombinations'][multiWayCombinationIndex].hasStake()) {
_.push(" value=\"");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getDisplayStake());
_.push("\" ");
}
_.push(" > </td> ");
if ((data['isMaxStakeShown'])) {
_.push(" <td class=\"bfBetEventTd bfEventDarkGray bfXcastExplanation\" valign=\"top\" align=\"right\"> ");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getMaxStake());
_.push("</td> ");
}
_.push(" </tr> ");
}
_.push(" </table> </td> </tr> ");
}
_.push(" </table> </div> ");
return _.join("");
}
// template: multiWayConfirmation
betslipTemplate.multiWayConfirmation=function(data){
var _=[];
_.push(" <div id='multiWayConfirmationPanelAnchor'> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
for(var multiWayCombinationIndex in data['multiWayCombinations']) {
if ((data['multiWayCombinations'][multiWayCombinationIndex].getStake() > 0)) {
_.push(" <tr> <td class='bfComboLeftConf'> ");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getNumberOfBets());
_.push(" ");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getCombinationName());
_.push(" @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['multiWayCombinations'][multiWayCombinationIndex].getStake()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['multiWayCombinations'][multiWayCombinationIndex].getStake()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class='bfComboMdlConf' align='right' nowrap> ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['multiWayCombinations'][multiWayCombinationIndex].getCost()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['multiWayCombinations'][multiWayCombinationIndex].getCost()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> </tr> ");
}
}
_.push(" </table> </div> ");
return _.join("");
}
// template: multiWayReport
betslipTemplate.multiWayReport=function(data){
var _=[];
_.push(" <div id='multiWayReportPanelAnchor'> <table border='0' cellpadding='0' cellspacing='0' class='bfWhiteLineBot' width='100%'> ");
for(var multiWayCombinationIndex in data['multiWayCombinations']) {
if ((data['multiWayCombinations'][multiWayCombinationIndex].getStake() > 0)) {
_.push(" <tr> <td class='bfComboLeftConf'> ");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getNumberOfBets());
_.push(" ");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getCombinationName());
_.push(" @ ");
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['multiWayCombinations'][multiWayCombinationIndex].getStake()));
_.push(" ");
} else {
_.push(" ");
_.push(data['multiWayCombinations'][multiWayCombinationIndex].getStake());
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" </td> <td class='bfComboMdlConf' align='right' nowrap> ");
if ((data['multiWayCombinations'][multiWayCombinationIndex].isFailed())) {
_.push(" <span class='bfImportantStatusMessage'><b>");
_.push(data['translations']["MSG_FAILED"]);
_.push("</b></span> ");
} else {
if ((data['currencySymbol'])) {
_.push(" ");
_.push(data['currencySymbol']+to_mn(data['multiWayCombinations'][multiWayCombinationIndex].getCost()));
_.push(" ");
} else {
_.push(" ");
_.push(to_mn(data['multiWayCombinations'][multiWayCombinationIndex].getCost()));
_.push(" ");
}
_.push(" ");
_.push(visitor.getCurrency());
_.push(" ");
}
_.push(" </td> </tr> ");
}
}
_.push(" </table> </div> ");
return _.join("");
}

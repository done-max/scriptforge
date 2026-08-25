import jsPDF from 'jspdf';
import type { Screenplay } from '../types/script';

export function exportScriptCoveragePdf(script: Screenplay) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryColor = [18, 60, 115]; // Odyssey Navy #123C73
  const darkBg = [5, 11, 22]; // Dark #050B16
  const goldColor = [197, 164, 109]; // Bronze #C5A46D
  const textDark = [30, 41, 59];
  const textMuted = [100, 116, 139];

  // Header Banner
  doc.setFillColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.rect(0, 0, 210, 42, 'F');

  // Decorative gold line
  doc.setDrawColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.setLineWidth(0.8);
  doc.line(14, 40, 196, 40);

  // Title & Brand
  doc.setTextColor(242, 245, 248);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('SCRIPTFORGE', 14, 18);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(112, 199, 245);
  doc.text('AI STORY INTELLIGENCE & SCREENPLAY COVERAGE', 14, 25);

  doc.setFontSize(8);
  doc.setTextColor(184, 196, 211);
  doc.text(`CONFIDENTIAL SCRIPT ANALYSIS REPORT • DATE: ${new Date().toLocaleDateString()}`, 14, 33);

  // Recommendation Badge
  const rec = script.coverage.recommendation;
  const recBg = rec === 'RECOMMEND' ? [34, 197, 94] : rec === 'CONSIDER' ? [234, 179, 8] : [239, 68, 68];
  doc.setFillColor(recBg[0], recBg[1], recBg[2]);
  doc.roundedRect(155, 12, 40, 16, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(rec, 175, 22, { align: 'center' });

  // Script Metadata Block
  let y = 50;
  doc.setTextColor(darkBg[0], darkBg[1], darkBg[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(script.title, 14, y);

  y += 6;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text(`Writer: ${script.author}  |  Genre: ${script.genre}  |  Pages: ${script.pageCount}  |  Market: ${script.coverage.marketViability}`, 14, y);

  // Score Dashboard Table
  y += 10;
  doc.setFillColor(245, 248, 252);
  doc.roundedRect(14, y, 182, 24, 2, 2, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(14, y, 182, 24, 2, 2, 'S');

  const scores = [
    { label: 'Overall Index', val: `${script.storyIntelligenceScore}/100` },
    { label: 'Structure', val: `${script.categoryScores.structure}/100` },
    { label: 'Character', val: `${script.categoryScores.character}/100` },
    { label: 'Dialogue', val: `${script.categoryScores.dialogue}/100` },
    { label: 'Pacing', val: `${script.categoryScores.pacing}/100` },
    { label: 'Theme', val: `${script.categoryScores.theme}/100` },
  ];

  scores.forEach((s, idx) => {
    const colX = 20 + idx * 30;
    doc.setFontSize(8);
    doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
    doc.setFont('helvetica', 'bold');
    doc.text(s.label, colX, y + 8);

    doc.setFontSize(12);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(s.val, colX, y + 17);
  });

  // Logline
  y += 34;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('LOGLINE', 14, y);

  y += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const loglineLines = doc.splitTextToSize(`"${script.coverage.logline || script.logline}"`, 182);
  doc.text(loglineLines, 14, y);
  y += loglineLines.length * 4.5 + 4;

  // Synopsis
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SYNOPSIS', 14, y);

  y += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const synLines = doc.splitTextToSize(script.coverage.synopsis, 182);
  doc.text(synLines, 14, y);
  y += synLines.length * 4.5 + 4;

  // Strengths & Craft Notes
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('KEY CRAFT STRENGTHS', 14, y);

  y += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  script.coverage.strengths.forEach((str) => {
    doc.setTextColor(34, 197, 94);
    doc.text('•', 14, y);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const strLines = doc.splitTextToSize(str, 174);
    doc.text(strLines, 18, y);
    y += strLines.length * 4.2 + 1;
  });

  y += 4;
  // Areas for Development
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('AREAS FOR STORY DEVELOPMENT', 14, y);

  y += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  script.coverage.areasForDevelopment.forEach((area) => {
    doc.setTextColor(234, 179, 8);
    doc.text('•', 14, y);
    doc.setTextColor(textDark[0], textDark[1], textDark[2]);
    const areaLines = doc.splitTextToSize(area, 174);
    doc.text(areaLines, 18, y);
    y += areaLines.length * 4.2 + 1;
  });

  y += 4;
  // Executive Summary
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('EXECUTIVE CONSULTANT SUMMARY', 14, y);

  y += 5;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  const execLines = doc.splitTextToSize(script.coverage.executiveSummary, 182);
  doc.text(execLines, 14, y);

  // Footer
  doc.setFontSize(7.5);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text('ScriptForge AI Story Intelligence • "Don\'t just write better pages. Understand why they work."', 105, 287, { align: 'center' });

  doc.save(`${script.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-scriptforge-coverage.pdf`);
}

export function downloadScreenplayText(script: Screenplay, format: 'fountain' | 'txt') {
  let content = '';
  if (format === 'fountain') {
    content = `Title: ${script.title}\nCredit: Written by\nAuthor: ${script.author}\nDraft date: ${new Date().toLocaleDateString()}\n\n===\n\n${script.fullRawText}`;
  } else {
    content = `${script.title}\nBy ${script.author}\n\n${script.fullRawText}`;
  }

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${script.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.${format}`;
  a.click();
  URL.revokeObjectURL(url);
}

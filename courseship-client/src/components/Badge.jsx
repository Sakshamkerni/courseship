// courseship-client/src/components/Badge.jsx
import React from 'react';
import { jsPDF } from 'jspdf';   // updated import

const Badge = ({ studentName, courseTitle }) => {
  const generatePDF = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(24);
    doc.text('Certificate of Completion', 105, 40, null, null, 'center');
    doc.setFontSize(16);
    doc.text(`This certifies that ${studentName}`, 105, 70, null, null, 'center');
    doc.text(`has successfully completed the course "${courseTitle}"`, 105, 90, null, null, 'center');
    doc.text(`on ${new Date().toLocaleDateString()}`, 105, 120, null, null, 'center');
    doc.save(`${courseTitle}-Certificate.pdf`);
  };

  const shareLinkedIn = () => {
    const shareUrl = encodeURIComponent(window.location.href);
    const title    = encodeURIComponent(`I completed "${courseTitle}" on Courseship!`);
    const summary  = encodeURIComponent('Earned my skills badge – check it out.');
    const linkedInUrl = 
      `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}&summary=${summary}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="mt-4">
      <button className="btn btn-outline-primary me-3" onClick={generatePDF}>
        🎖️ Download Badge
      </button>
      <button className="btn btn-primary" onClick={shareLinkedIn}>
        🔗 Share on LinkedIn
      </button>
    </div>
  );
};

export default Badge;

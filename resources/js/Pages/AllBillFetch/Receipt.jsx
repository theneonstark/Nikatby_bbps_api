import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const Receipt = () => {
  const [receiptData, setReceiptData] = useState(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true); // State to manage button visibility

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const data = {
      billerName: queryParams.get('billerName'),
      customerName: queryParams.get('customerName'),
      caNumber: queryParams.get('caNumber'),
      division: queryParams.get('division'),
      ltHt: queryParams.get('ltHt'),
      billAmount: queryParams.get('billAmount'),
      billDate: queryParams.get('billDate'),
      billNumber: queryParams.get('billNumber'),
      billPeriod: queryParams.get('billPeriod'),
      dueDate: queryParams.get('dueDate'),
    };
    setReceiptData(data);
  }, []);

  const downloadPDF = () => {
    // Hide the button after it's clicked
    setIsButtonVisible(false);

    const input = document.getElementById('receipt-content');
    html2canvas(input, {
      backgroundColor: "#FFFFFF", // Ensure the background is white in the canvas
      scale: 2, // Improve image quality (optional)
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Set the PDF background color to white
      pdf.setFillColor(255, 255, 255);  // RGB for white
      pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F'); // Fill the entire page with white

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      // Add image to the PDF with the correct width and height
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Save the generated PDF with the correct styles
      pdf.save('Bill-Receipt.pdf');
      
      // Optionally, you can re-enable the button after a timeout
      setTimeout(() => {
        setIsButtonVisible(false); // Re-enable the button after 2 seconds
      }, 2000);
    });
  };

  if (!receiptData) return <div className="text-center py-10">Loading receipt...</div>;

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
          <div id="receipt-content" className="bg-white shadow-lg rounded-md p-8 max-w-xl w-full text-gray-800">
            <div className="flex items-center justify-between mb-6">
              <img
                src="/images/B Assured Logo_JPG.jpg"
                alt="Logo"
                className="w-24 h-24 object-contain"
              />
              <h2 className="text-3xl font-bold text-center flex-1">Payment Receipt</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 text-sm">
              <ReceiptRow label="Biller Name" value={receiptData.billerName} />
              <ReceiptRow label="Consumer Name" value={receiptData.customerName} />
              <ReceiptRow label="CA Number" value={receiptData.caNumber} />
              <ReceiptRow label="Division" value={receiptData?.division ?? 'N/A'} />
              <ReceiptRow label="LT/HT" value={receiptData.ltHt ?? 'N/A'} />
              <ReceiptRow label="Bill Amount" value={`₹${receiptData.billAmount}`} />
              <ReceiptRow label="Bill Date" value={receiptData.billDate} />
              <ReceiptRow label="Bill Number" value={receiptData.billNumber} />
              <ReceiptRow label="Bill Period" value={receiptData.billPeriod} />
              <ReceiptRow label="Due Date" value={receiptData.dueDate} />
            </div>
           
          </div>
           <div className="mt-6 text-center">
              {isButtonVisible && (
                <button
                  onClick={downloadPDF}
                  className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
                >
                  Download Receipt
                </button>
              )}
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

const ReceiptRow = ({ label, value }) => (
  <div className="flex justify-between border-b py-2">
    <span className="font-medium text-gray-600">{label}</span>
    <span className="text-gray-800">{value || 'N/A'}</span>
  </div>
);

export default Receipt;

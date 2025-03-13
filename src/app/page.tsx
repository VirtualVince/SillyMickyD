'use client';

import { useState } from 'react';
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
};

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isPdfReady, setIsPdfReady] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  const onSubmit = (data: FormData) => {
    // Generate PDF
    const doc = new jsPDF();
    
    // Add content to PDF
    doc.setFontSize(20);
    doc.text("Application Form", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Full Name: ${data.fullName}`, 20, 40);
    doc.text(`Email: ${data.email}`, 20, 50);
    doc.text(`Phone: ${data.phone}`, 20, 60);
    doc.text(`Address: ${data.address}`, 20, 70);
    doc.text(`Education: ${data.education}`, 20, 80);
    doc.text(`Experience: ${data.experience}`, 20, 90);
    
    // Generate blob URL for download
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setIsPdfReady(true);
  };
  
  return (
    <div className="grid items-center justify-items-center min-h-screen p-8">
      <main className="flex flex-col gap-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold">Application Form</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              className="p-2 border rounded"
              {...register("fullName", { required: true })}
            />
            {errors.fullName && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="p-2 border rounded"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              className="p-2 border rounded"
              {...register("phone", { required: true })}
            />
            {errors.phone && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              className="p-2 border rounded"
              {...register("address", { required: true })}
            />
            {errors.address && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="education">Education</label>
            <textarea
              id="education"
              className="p-2 border rounded"
              {...register("education", { required: true })}
            />
            {errors.education && <span className="text-red-500">This field is required</span>}
          </div>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="experience">Experience</label>
            <textarea
              id="experience"
              className="p-2 border rounded"
              {...register("experience", { required: true })}
            />
            {errors.experience && <span className="text-red-500">This field is required</span>}
          </div>
          
          <button
            type="submit"
            className="rounded-full border border-solid border-transparent bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-12 px-5"
          >
            Generate PDF
          </button>
        </form>
        
        {isPdfReady && pdfUrl && (
          <div className="flex flex-col gap-4 items-center">
            <p className="text-green-600">Your PDF is ready!</p>
            <a
              href={pdfUrl}
              download="application.pdf"
              className="rounded-full border border-solid border-transparent bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-12 px-5 flex items-center justify-center"
            >
              Download PDF
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
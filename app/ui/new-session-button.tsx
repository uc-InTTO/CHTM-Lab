"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface BorrowingFormData {
  studentName: string;
  floor: string;
  date: string;
  idNumber: string;
  section: string;
  courseSubject: string;
  timeIn: string;
  timeOut: string;
  activityTitle: string;
  instructor: string;
  custodianIssued: string;
}

interface BorrowingModalProps {
  CartIcon: React.ComponentType;
  isPending: boolean;
  onSave: (data: BorrowingFormData) => void;
  externalIsOpen: boolean;
  setExternalIsOpen: (open: boolean) => void;
  initialData?: any;
}

export const BorrowingModal = ({ 
  CartIcon, 
  isPending, 
  onSave, 
  externalIsOpen, 
  setExternalIsOpen, 
  initialData 
}: BorrowingModalProps) => {

  const emptyForm: BorrowingFormData = {
    studentName: "",
    floor: "",
    date: new Date().toISOString().split("T")[0],
    idNumber: "",
    section: "",
    courseSubject: "",
    timeIn: "",
    timeOut: "",
    activityTitle: "",
    instructor: "",
    custodianIssued: "",
  };

  const [formData, setFormData] = useState<BorrowingFormData>(emptyForm);

  // Sync state data whenever an approved request injection is mounted
  useEffect(() => {
    if (initialData) {
      setFormData({
        studentName: initialData.studentName || "",
        floor: initialData.floor || "",
        date: initialData.date || new Date().toISOString().split("T")[0],
        idNumber: initialData.idNumber || "",
        section: initialData.section || "",
        courseSubject: initialData.courseSubject || "",
        timeIn: initialData.timeIn || "",
        timeOut: initialData.timeOut || "",
        activityTitle: initialData.activityTitle || "",
        instructor: initialData.instructor || "",
        custodianIssued: initialData.custodianIssued || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialData, externalIsOpen]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setFormData(emptyForm);
          setExternalIsOpen(true);
        }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-700 hover:bg-green-700/80 transition-colors"
      >
        <CartIcon />
        New
      </button>

      {externalIsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800/60 bg-opacity-50 z-50">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <p className="text-lg font-bold text-gray-900 mb-4">Borrowing Details</p>
            
            <div className="flex flex-col gap-3 text-sm text-gray-700">
              <div>
                <p className="text-gray-500 text-xs font-semibold mb-1">Student Name (SURNAME, FIRST NAME)</p>
                <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" required />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-1">Floor Level</p>
                  <select name="floor" value={formData.floor} onChange={handleInputChange} className="border border-gray-200 bg-white rounded-xl p-2 w-full focus:outline-emerald-600" required>
                    <option value="">Select...</option>
                    <option value="1">Floor 1</option>
                    <option value="2">Floor 2</option>
                    <option value="3">Floor 3</option>
                  </select>
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-1">Date</p>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-1">ID Number</p>
                  <input type="text" name="idNumber" value={formData.idNumber} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" required />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-1">Section</p>
                  <input type="text" name="section" value={formData.section} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-xs font-semibold mb-1">Course / Subject</p>
                <input type="text" name="courseSubject" value={formData.courseSubject} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-1">Time In</p>
                  <input type="time" name="timeIn" value={formData.timeIn} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-semibold mb-1">Time Out</p>
                  <input type="time" name="timeOut" value={formData.timeOut} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-xs font-semibold mb-1">Title of the Activity</p>
                <input type="text" name="activityTitle" value={formData.activityTitle} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
              </div> 
              <div>
                <p className="text-gray-500 text-xs font-semibold mb-1">Instructor</p>
                <input type="text" name="instructor" value={formData.instructor} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
              </div>
              <div>         
                <p className="text-gray-500 text-xs font-semibold mb-1">Custodian Issued</p>
                <input type="text" name="custodianIssued" value={formData.custodianIssued} onChange={handleInputChange} className="border border-gray-200 rounded-xl p-2 w-full focus:outline-emerald-600" />
              </div>  
            </div>
            
            <div className="flex flex-row w-full justify-between mt-6 gap-3">
              <button
                type="button"
                onClick={() => setExternalIsOpen(false)}
                className="border rounded-xl border-gray-200 p-2.5 w-full text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded-xl bg-emerald-700 disabled:bg-gray-300 p-2.5 w-full text-white font-semibold hover:bg-emerald-800 transition-colors"
              >
                {isPending ? "Saving..." : "Save Draft"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

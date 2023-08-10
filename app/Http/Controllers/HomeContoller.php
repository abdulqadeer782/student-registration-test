<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();

        return Inertia::render('ViewStudent', ['students' => $students]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('RegistrationForm');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:students,email',
            'phone' => 'required',
            'image' => 'required',
            'document' => 'required',
        ]);

        // Handle image upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        // Handle image upload
        $docPath = null;
        if ($request->hasFile('document')) {
            $docPath = $request->file('document')->store('document', 'public');
        }

        // Create the student record in the database
        $student = Student::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'image' => $imagePath,
            'document' => $docPath,
            'subject' => $request->subject ? implode(',', $request->subject) : ''
        ]);

        if (!$student) {
            return back()->with([
                'message' => 'Something went wrong!.',
            ]);
        }
        return redirect('/student');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $student = Student::find($id);

        return Inertia::render('EditStudent', ['student' => $student, 'id' => $id]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::find($id);
        $student->name = $request->name;
        $student->email = $request->email;
        $student->phone = $request->phone;

        if ($request->has('subjects')) {
            $student->subject = implode(',', $request->subjects);
        }

        $student->save();

        return redirect('/student')->with(['message' => "Student $student->name updated successfully."]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::find($id);
        $imagePath = $student->image;
        $docPath = $student->document;
        if ($imagePath && $docPath) {
            $deleted = Storage::disk('public')->delete($imagePath);
            $deleted = Storage::disk('public')->delete($docPath);
            if (!$deleted) {
                return back()->with(['error' => 'Image deletion failed'], 500);
            }
        }

        $student->delete();

        return redirect('/student')->with(['message' => 'Student Deleted Successfull.']);
    }

}
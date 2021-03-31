<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

use App\Models\Contact;

class ContactController extends Controller
{
    public function getContacts(){
      $contacts = DB::select('SELECT * FROM contacts');
      return response()->json(['contacts' => $contacts], 200);
    }

    public function saveContact(Request $req){
      $contact = new Contact;
      if($req->has('image') && !empty($req->image)){
        $imageName = time() . '.' . $req->image->getClientOriginalExtension();
        $req->image->move(public_path('images/gallery'), $imageName);
        $path = ('images/gallery/'.$imageName);
        $contact->image = $path;
    	}

			$contact->name		     = $req->name;
			$contact->email 	     = $req->email;
			$contact->designation  = $req->designation;
			$contact->bio 		     = $req->biography;
			$contact->contact_no   = $req->contact_no;

			if($contact->save()){
				return response()->json(['status' => true, 'message' => 'Contact Added Successfully!']);
			}else{
				return response()->json(['status' => false, 'message' => 'Error saving data.']);
			}
    }

		public function editContact($id){
			$contact = Contact::find($id);
			return response()->json($contact);
		}

		public function updateContact(Request $req, $id){
      $contact = Contact::where('id', $id)->first();
      if($req->has('image') && !empty($req->image)){
        $imageName = time() . '.' . $req->image->getClientOriginalExtension();
        $req->image->move(public_path('images/gallery'), $imageName);
        $path = ('images/gallery/'.$imageName);
        $contact->image = $path;
    	}

			$contact->name		     = $req->name;
			$contact->email 	     = $req->email;
			$contact->designation  = $req->designation;
			$contact->bio 		     = $req->biography;
			$contact->contact_no   = $req->contact_no;

			if($contact->save()){
				return response()->json(['status' => true, 'message' => 'Contact Updated Successfully!']);
			}else{
				return response()->json(['status' => false, 'message' => 'Error updating data.']);
			}
    }

		public function deleteContact($id){
			$contact = Contact::find($id);
			if($contact->delete()){
				return response()->json(['status' => true, 'message' => 'Contact Deleted Successfully!']);
			}else{
				return response()->json(['status' => false, 'message' => 'Contact Deletion failed!']);
			}
		}
}

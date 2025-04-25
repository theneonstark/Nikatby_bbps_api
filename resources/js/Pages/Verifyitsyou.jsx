import { Button } from "@/components/ui/button";
import { usePage } from "@inertiajs/react";

export default function Unauthorized() {
    const { props: inertiaProps } = usePage();
    const user = inertiaProps.auth?.user;
    const userrole = user?.name || '';
    return (
        
      <div className="p-6 text-center">
      {userrole ?(
         <p className="text-3xl font-bold text-blue-600">Hey, {userrole} </p>) : 'Login Please'}
        <h1 className="text-3xl font-bold text-red-600">Verification will be done before Proceed Furture</h1>
        <a href="/getonboarding"><Button className="text-1xl font-bold bg-green-600">Start The Onboarding Process Untill Your Profile Become 100%.</Button></a>
        
      </div>
    )
  }
  
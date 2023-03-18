import { AbstractControl } from "@angular/forms";

export function passwordMisMatch(fg:AbstractControl): { [ key : string ] : boolean } | null 
{
        const password = fg.get("password")?.value;
        const confirmPassword = fg.get("confirmPassword")?.value;
        if(!password || !confirmPassword)
        {
            return null ;
        }
        if(password != confirmPassword)
        
        {
        console.log(password)
        console.log(confirmPassword)
            return {"passwordMisMatch1" : true};
        }
        return null;
}
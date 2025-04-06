export type UserProps = {
    id: string;
    name: string;
    email: string;
    age: number;
};

export class User {
    
    private constructor(private props: UserProps) {}

    public static create(id: string,name: string, email: string, age:number) {
        const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        const ageAllow = parseInt( process.env.AGE_ALLOW);
        if(!emailRegex.test(email))
            throw new Error("E-mail inválido");
        if(age < ageAllow)
            throw new Error("Idade mínima para cadastro é " + ageAllow);
        return new User({
            id: id ?? crypto.randomUUID().toString(),
            name,
            email,
            age,
        });
    }

    public static with(props: UserProps) {
        return new User(props);
    }

    public get id() {
        return this.props.id;
    }

    public get name(){
        return this.props.name;
    }

    public get email(){
        return this.props.email;
    }

    public get age(){
        return this.props.age;
    }

    public increaseage(age: number){
        this.props.age += age;
    }

    public decreaseage(age: number){
        this.props.age -= age;
    }
}
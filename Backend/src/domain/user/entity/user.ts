export type UserProps = {
    id: string;
    name: string;
    email: string;
    age: number;
};

export class User {
    private constructor(private props: UserProps) {}

    public static create(name: string, email: number) {
        return new User({
            id: crypto.randomUUID().toString(),
            name,
            email,
            age: 0,
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
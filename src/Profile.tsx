
export interface IUser {
    fullName: string;
    age: number;
    gender: string;
    _id: string;
    image?: string;
    email: string;
    password: string;
}

interface ProfileProps {
    profile: IUser
}

function Profile({ profile }: ProfileProps) {
    return (
        <div>
            <h2>{profile.image}</h2>
            <h2>Name:{profile.fullName}</h2>
            <h2>Age:{profile.age}</h2>
            <h2>Gender:{profile.gender}</h2>
            <h2>ID:{profile._id}</h2>  
            <h2>Mail:{profile.email}</h2>
        </div>
    )
}

export default Profile
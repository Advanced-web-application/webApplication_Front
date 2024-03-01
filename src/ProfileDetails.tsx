import 'bootstrap/dist/css/bootstrap.min.css';

export interface IUser {
    fullName: string;
    age: number;
    gender: string;
    _id: string;
    image?: string;
    email: string;
    password?: string;
}

interface ProfileProps {
    profile: IUser
}


function ProfileDetails({ profile }: ProfileProps) {
    return (
        <div className="card">
            <img src={profile.image} className="card-img-top img-fluid" style={{maxWidth: '200px'}} alt={profile.fullName} />
            <div className="card-body">
                <h5 className="card-title">{profile.fullName}</h5>
                <p className="card-text">
                    <strong>Age:</strong> {profile.age}<br />
                    <strong>Gender:</strong> {profile.gender}<br />
                    <strong>ID:</strong> {profile._id}<br />
                    <strong>Email:</strong> {profile.email}
                </p>
            </div>
        </div>
    )
}

export default ProfileDetails
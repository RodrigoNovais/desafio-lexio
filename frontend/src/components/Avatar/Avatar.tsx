import AvatarCSS from './Avatar.module.css';

type AvatarProps = { name: string }

const getInitials = (name: string) => {
    const names = name.split(/\s+/).filter(Boolean);

    return `${names[0][0]}${names.length > 1 ? names[names.length - 1][0] : ''}`.toUpperCase();
};

const Avatar: React.FC<AvatarProps> = ({ name }) => {
    if (!name.length)
        throw new Error('Name param must not be empty');

    return (
        <div className={AvatarCSS['avatar']} title={name}>
            {getInitials(name)}
        </div>
    );
};

export default Avatar;

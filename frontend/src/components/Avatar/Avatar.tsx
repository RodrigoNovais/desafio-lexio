import AvatarCSS from './Avatar.module.css';

type AvatarProps = { name: string }

const Avatar: React.FC<AvatarProps> = ({ name }) => {
    return (
        <div className={AvatarCSS['avatar']} title={name}>
            {name.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g)?.join('')}
        </div>
    );
};

export default Avatar;

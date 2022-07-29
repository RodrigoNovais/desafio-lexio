export const Status = {
    'arquivado':            'archived',
    'aguard. aprov.':       'awaiting-approval',
    'aguard. assinatura':   'awaiting-signature',
    'assinado':             'signed',
    'em revisão':           'under-review',
} as const;

type BadgeProps = { status: keyof typeof Status; }

import BadgeCSS from './Badge.module.css';

const Badge: React.FC<BadgeProps> = ({ status }) => {
    if (!status.length)
        throw new Error('Status param must not be empty');

    if (!(status in Status))
        throw new Error('Status param provided is not allowed');

    return (
        <div className={`${BadgeCSS['badge']} ${BadgeCSS[Status[status]]}`}>
            <span>·</span>
            <p>{status}</p>
        </div>
    );
};

export default Badge;

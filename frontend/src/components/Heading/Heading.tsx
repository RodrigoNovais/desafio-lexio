import HeadingCSS from './Heading.module.css';

const Heading: React.FC = () => {
    return (
        <header className={HeadingCSS['heading']}>
            <p>Lexio Teste</p>

            <div>
                <img src='/assets/images/icons/calendar.svg' />
                <p>24</p>
                <span>Eventos<br /> da semana</span>
            </div>
        </header>
    )
}

export default Heading;

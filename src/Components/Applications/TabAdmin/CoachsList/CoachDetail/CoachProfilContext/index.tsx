
import { TabContent, TabPane } from "reactstrap";

const CoachProfilTabContent: React.FC<{ basicTab: any, user: any }> = ({ basicTab, user }) => {

    return (
        <TabContent activeTab={basicTab} className="mt-5">

            <TabPane tabId="1" className="main-content-body">
                <div className="mb-4">
                    <h4 className="section-title mb-3">BIOGRAPHIE</h4>
                    <p className="bio-text">
                        Bonjour, je suis Marie Curie, une scientifique passionnée et pionnière dans les domaines de la physique et de la chimie. Originaire de Pologne, j'ai consacré ma vie à l'étude des éléments radioactifs et à la recherche scientifique pour faire avancer notre compréhension de la matière. Mon travail m'a menée à la découverte de deux éléments, le polonium et le radium, et m'a permis de devenir la première femme à recevoir un prix Nobel, puis la première personne à en recevoir deux dans des disciplines différentes : la physique et la chimie.
                    </p>
                    <p className="bio-text">
                        Tout au long de ma carrière, j'ai été profondément engagée dans la recherche et la transmission de la connaissance. En tant que professeure à l'Université de Paris, j'ai eu l'honneur de former de nombreux étudiants et de partager mes découvertes avec eux. J'ai fondé l'Institut du Radium, qui est aujourd'hui reconnu comme l'un des centres de recherche les plus importants en physique et en chimie. Mon travail a ouvert la voie à des avancées majeures dans la médecine et la recherche sur le cancer, permettant l'usage des rayonnements pour traiter les maladies.
                    </p>
                </div>
                <div className="border-top pt-4">
                    <h6 className="section-subtitle mb-3">Statistiques</h6>
                    <div className="statistics">
                        <span className="stat-item">Projets : <b>50</b></span>
                        <span className="stat-item">Followers : <b>800</b></span>
                        <span className="stat-item">Following : <b>100</b></span>
                    </div>
                </div>
            </TabPane>

            <TabPane tabId="2">
                <div className="experience-section mb-4">
                    <h5 className="section-subtitle mb-3">Expérience</h5>
                    <div className="experience-item mb-3">
                        <h6 className="experience-title text-primary">Chercheuse en Physique</h6>
                        <p className="company-name">Institut du Radium</p>
                        <p className="date-range"><b>1906</b> - <b>1934</b></p>
                        <p className="experience-description text-muted">Conduite de recherches innovantes sur la radioactivité.</p>
                    </div>
                </div>
                <div className="border-top pt-4">
                    <h6 className="section-subtitle mb-3">Compétences</h6>
                    <p className="skills-list">Physique, Chimie, Recherche scientifique, Enseignement</p>
                </div>
            </TabPane>

            <TabPane tabId="3">
                <div className="contact-info d-flex flex-column">
                    <div className="contact-item">
                        <i className="icofont icofont-ui-call"></i> {user?.phone_number}
                    </div>
                    <div className="contact-item">
                        <i className="icofont icofont-ui-email"></i> {user?.email}
                    </div>
                    <div className="contact-item">
                        <i className="icofont icofont-map"></i> {user?.address}
                    </div>
                </div>
            </TabPane>
        </TabContent>

    );
};

export default CoachProfilTabContent;

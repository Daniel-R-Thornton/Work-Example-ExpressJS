import useClients from "../../hooks/useClients";
import styles from "./ClientList.module.css";
import AddClientWizardButton from "../AddClientWizardButton/AddClientWizardButton";
import useFundingSources from "../../hooks/useFundingSources";
import { languageFromId, toTileCase } from "../../utils/StringUtils";

export default function ClientList() {
  const { clients, invalidate } = useClients();
  const { fundingSources } = useFundingSources();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>
        Clients
        <AddClientWizardButton onFinish={invalidate} />
      </h1>
      <ul className={styles.clientList}>
        {/* header  */}
        <li className={styles.clientItemHeader}>
          <div>Name</div>
          <div>Date of Birth</div>
          <div>Main Language</div>
          <div>Secondary Language</div>
          <div>Funding Source</div>
        </li>

        {clients.map((client) => (
          <li key={client.id} className={styles.clientItem}>
            <div> {toTileCase(client.name)}</div>
            <div>{new Date(client.dateOfBirth).toLocaleDateString()}</div>
            <div>{languageFromId(client.mainLanguage)}</div>
            <div>{languageFromId(client.secondaryLanguage)}</div>
            <div>
              {
                fundingSources.find(
                  (item) => item.id === client.fundingSourceId
                )?.name
              }
            </div>
          </li>
        ))}
        {clients.length === 0 && (
          <li className={styles.noClientsItem}>
            <div>
              No clients found click on the "Add Client" button to get started!
            </div>
          </li>
        )}
      </ul>
    </div>
  );
}

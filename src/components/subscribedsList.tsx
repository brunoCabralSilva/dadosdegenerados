import { IActivityRegisterWithId, ISubscribeWithId } from "@/interfaces";

export default function SubscribedsList(props: { list: ISubscribeWithId[], activity: IActivityRegisterWithId }) {
  const { list, activity } = props;
  return(
    <div
      className="text-white w-full bg-[url(/images/dd_logo_bg_black.png)] border-2 border-white p-4 mb-3"
    >
      <div className="w-full font-bold mb-3 hidden sm:flex sm:flex-col">
        <div className="mb-3">
          { activity.name } - { activity.typeActivity } - { activity.systemSession.name }
        </div>
        <div className="h-0.5 w-full bg-white mt-2 mb-3" />
        <div className="break-words w-full grid grid-cols-6 text-white">
          <div className="font-bold">Nome</div>
          <div className="font-bold">Idade</div>
          <div className="font-bold col-span-2">Email</div>
          <div className="font-bold">Whatsapp</div>
          <div className="font-bold">Está no Grupo?</div>
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === false)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="col-span-6 grid grid-cols-6 w-full font-normal"
                key={ index }
              >
                <div>{ subscribeds.firstName } { subscribeds.lastName }</div>
                <div>{ subscribeds.age }</div>
                <div className="col-span-2">{ subscribeds.email }</div>
                <div>{ subscribeds.whatsapp }</div>
                <div>{ subscribeds.whatsappGroup ? 'Sim' : 'Não' }</div>
              </div>
            ))
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <span className="col-span-6 mt-5">
              Lista de Espera
            </span>
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <div className="col-span-6 h-0.5 w-full bg-white mt-2 mb-3" />
          }
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="col-span-6 grid grid-cols-6 w-full font-normal"
                key={ index }
              >
                <div>{ subscribeds.firstName } { subscribeds.lastName }</div>
                <div>{ subscribeds.age }</div>
                <div className="col-span-2">{ subscribeds.email }</div>
                <div>{ subscribeds.whatsapp }</div>
                <div>{ subscribeds.whatsappGroup ? 'Sim' : 'Não' }</div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="sm:hidden w-full font-bold mb-3">
        <div className="mb-3">
          { activity.name } - { activity.typeActivity } - { activity.systemSession.name }
        </div>
        <div className="h-0.5 w-full bg-white mt-2 mb-3" />
        <div className="break-words w-full text-white">
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === false)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="w-full font-normal text-sm mb-3"
                key={ index }
              >
                <div>
                  <span className="font-bold pr-1">Nome:</span>
                  <span>{ subscribeds.firstName } {subscribeds.lastName }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Idade:</span>
                  <span>{ subscribeds.age }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Email:</span>
                  <span>{ subscribeds.email }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Whatsapp:</span>
                  <span>{ subscribeds.whatsapp }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Está no grupo do Whatsapp?</span>
                  <span>{ subscribeds.whatsappGroup ? 'Sim' : 'Não' }</span>
                </div>
              </div>
            ))
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <span className="col-span-6 mt-5">
              Lista de Espera
            </span>
          }
          {
            list.filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true).length > 0 &&
            <div className="col-span-6 h-0.5 w-full bg-white mt-2 mb-3" />
          }
          {
            list
            .filter((subscribeds: ISubscribeWithId) => subscribeds.activityId === activity.id && subscribeds.waitlist === true)
            .map((subscribeds: ISubscribeWithId, index: number) => (
              <div
                className="w-full font-normal text-sm mb-3"
                key={ index }
              >
                <div>
                  <span className="font-bold pr-1">Nome:</span>
                  <span>{ subscribeds.firstName } {subscribeds.lastName }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Idade:</span>
                  <span>{ subscribeds.age }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Email:</span>
                  <span>{ subscribeds.email }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Whatsapp:</span>
                  <span>{ subscribeds.whatsapp }</span>
                </div>
                <div>
                  <span className="font-bold pr-1">Está no grupo do Whatsapp?</span>
                  <span>{ subscribeds.whatsappGroup ? 'Sim' : 'Não' }</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
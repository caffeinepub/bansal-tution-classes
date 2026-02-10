import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Time "mo:core/Time";

module {
  type UserProfile = {
    name : Text;
  };

  type Lesson = {
    subject : Text;
    dayOfWeek : Text;
    startTime : Time.Time;
    endTime : Time.Time;
    teacher : Text;
    classroom : Text;
  };

  type PaymentSettings = {
    paymentId : Text;
    paymentProviderUrl : Text;
  };

  type OldActor = {};
  type NewActor = {
    userProfiles : Map.Map<Principal, UserProfile>;
    timetable : Map.Map<Text, Lesson>;
    paymentSettings : PaymentSettings;
  };

  public func run(old : OldActor) : NewActor {
    let userProfiles = Map.empty<Principal, UserProfile>();
    let timetable = Map.empty<Text, Lesson>();
    let paymentSettings : PaymentSettings = {
      paymentId = "DE1234567ICPEURPAYCORE"; // default id
      paymentProviderUrl = "https://www.stoicwallet.com"; // default provider
    };

    {
      userProfiles;
      timetable;
      paymentSettings;
    };
  };
};
